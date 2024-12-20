import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CrewService } from '../../services/crew.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TIPOPERSONA } from '../../shared/Interfaces/typo_persona';
import { TIPOCREW } from '../../shared/Interfaces/typo_crew';
import { LateralMenuComponent } from '../../components/lateral-menu/lateral-menu.component';
import { HeaderComponent } from '../../components/header/header.component';
import { Subscription, catchError, map, of, switchMap } from 'rxjs';
import { info_files } from '../../shared/Interfaces/files_types';
import { GlobalService } from '../../services/global.service';
import { HttpEventType } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { STATUSFORM } from '../../shared/Interfaces/status_form';
import { VendorNaturalComponent } from '../../components/initial-forms-pages/vendor-natural/vendor-natural.component';
import { VendorJuridicoComponent } from '../../components/initial-forms-pages/vendor-juridico/vendor-juridico.component';

@Component({
  selector: 'app-initial-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    HeaderComponent,
    LateralMenuComponent,
    VendorNaturalComponent,
    VendorJuridicoComponent,
  ],
  templateUrl: './initial-form.component.html',
  styleUrl: './initial-form.component.scss'
})
export class InitialFormComponent implements OnInit {

  @Input() lists: any = {};
  @Input() crewId: any = null;
  @Input() typeCrew: TIPOCREW | null = null;
  @Input() crew: any = null;
  @Input() crewAnswers: any[] = [];

  @Output() notify: EventEmitter<any> = new EventEmitter();

  readonly TIPOPERSONA = TIPOPERSONA;
  readonly TIPOCREW = TIPOCREW;
  readonly STATUSFORM = STATUSFORM;

  loading: boolean = false;
  linkDocument: any = null;
  typePersons = [
    { id: TIPOPERSONA.Natural, value: 'Natural' },
    { id: TIPOPERSONA.Juridica, value: 'Jurídica' },
  ];
  crewForm: FormGroup;
  subs: Subscription[] = [];

  constructor(
    private _cS: CrewService,
    private router: Router,
    private fb: FormBuilder,
    private _gS: GlobalService,
  ) {
    this.crewForm = this.fb.group({
      type_persona_id: new FormControl({ value: 0, disabled: true }, Validators.compose([Validators.required, Validators.pattern(/^[1-9]\d*$/)])),
    });
  }

  ngOnInit(): void {
    if (this.crew) {
      this.setPersonsTypes();
      this.fillForm();
    }

    this.subs.push(this.crewForm.valueChanges.subscribe(valor => {
      const data = {
        typeForm: STATUSFORM.Creado,
        typePerson: valor['type_persona_id'],
        form: valor
      };
      this._cS.setGeneralForm(data);
    }));
  }

  setPersonsTypes() {
    if ([TIPOCREW.CrewMexico, TIPOCREW.CastMexico].includes(this.typeCrew!)) {
      this.typePersons = [
        { id: TIPOPERSONA.Fisica, value: 'Fisica' },
        { id: TIPOPERSONA.Moral, value: 'Moral' },
      ];
    }
  }

  fillForm() {
    if (this.typeCrew == TIPOCREW.Cast) {
      this.typePersons.push(
        { id: TIPOPERSONA.Manager, value: 'A través de manager' },
        { id: TIPOPERSONA.NaturalHonorarios, value: 'Persona natural con honorarios inferiores a 1 SMMLV' }
      );
      this.crewForm.get('type_persona_id')?.setValue(this.crew?.cast_person_type_id || '');
      this.crewForm.get('type_persona_id')?.disable();
    }

    if (this.typeCrew != TIPOCREW.Cast) {
      this.crewForm.get('type_persona_id')?.setValue(this.crew?.f_person_type_id || '');
    }
    if (this.typeCrew == TIPOCREW.Vendor) {
      this.crewForm.get('type_persona_id')?.disable();
    }
  }

  sendForm(ev: any) {
    this.loading = true;

    const isMexForm = [TIPOCREW.CrewMexico, TIPOCREW.CastMexico].includes(this.typeCrew!);
    const formData = isMexForm
      ? this._gS.setInitialFormMx(this.crewForm.get('type_persona_id')?.value, ev.value)
      : this._gS.setInitialForm(this.crewForm.get('type_persona_id')?.value, ev.value);

    this._cS.updateCrewCast(formData).pipe(
      switchMap(() => {
        return this._cS.changeStatus({ second_form: isMexForm });
      })
    ).subscribe(() => {
      this.router.navigate(['thanks', this.crewId]);

      this.loading = false;
    });
  }

  updateForm() {
    const dataForm = this._cS.getGeneralForm();
    const formData = this._gS.setInitialForm(this.crewForm.get('type_persona_id')?.value, dataForm.form);
    this._cS.updateCrewCast(formData).subscribe({
      next: () => {
        this.notify.emit();
      }
    });
  }

  submitFile(ev: any) {
    this.loading = true;
    const { value, formControlName } = ev;
    const fileIdDocument = Object.keys(info_files).find(
      (key) =>
        info_files[key as unknown as keyof typeof info_files] == formControlName
    );

    const documentId = this._gS.getDocumentLink(fileIdDocument)?.document_id;
    if (!value) {
      this._cS.deleteCrewDocument(documentId)
        .subscribe((data) => this.loading = false);
    }
    else {
      const nameFile = this._gS.normalizeString(value.name);
      this._cS.getPresignedPutURL(nameFile, ev.crew_id).pipe(
        catchError((error) =>
          of({ id: fileIdDocument, file: value, key: '', url: '' })
        ),
        map((putUrl: any) => ({
          ...putUrl,
          id: fileIdDocument,
          file: value,
        })),
        switchMap((uploadFile: any) => {
          if (!uploadFile.url) {
            return of({ blobFile: null, uploadFile });
          }
          return new Promise(resolve => {
            uploadFile.file.arrayBuffer().then((blobFile: File) => resolve({ blobFile, uploadFile }));
          });
        }),
        switchMap((blobUpdateFile: any) => {
          const { blobFile, uploadFile } = blobUpdateFile;
          if (!blobFile) {
            return of(uploadFile);
          }
          return this._cS.uploadFileUrlPresigned(<File>blobFile, uploadFile.url, uploadFile.file.type)
            .pipe(
              catchError((_) => of({ ...value, url: '' })),
              map((value) => value.type == HttpEventType.Response ? uploadFile : null)
            );
        }),
        switchMap(
          (uploadFile: any) => {
            if (!uploadFile) return of(false);
            return this._cS.updateCrewDocument({
              f_vendor_document_type_id: Number(uploadFile.id),
              link: uploadFile.url
                ? `${ev.crew_id}/${nameFile}`
                : ``,
            });
          }
        ),
        map((response: any) => {
          this.linkDocument = response;
        })
      )
        .subscribe((value) => {
          setTimeout(() => {
            this.updateForm();
          }, 3500)
        });
    }
  }

  get fCrew() {
    return this.crewForm.controls;
  }

  ngOnDestroy() {
    this.subs.map(s => s.unsubscribe());
  }
}