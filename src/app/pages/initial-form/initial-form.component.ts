import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { VendorService } from '../../services/vendor.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TIPOPERSONA } from '../../shared/Interfaces/typo_persona';
import { LateralMenuComponent } from '../../components/lateral-menu/lateral-menu.component';
import { HeaderComponent } from '../../components/header/header.component';
import { Subscription, catchError, map, of, switchMap } from 'rxjs';
import { info_files } from '../../shared/Interfaces/files_types';
import { GlobalService } from '../../services/global.service';
import { HttpEventType } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { VendorNaturalComponent } from '../../components/initial-forms-pages/vendor-natural/vendor-natural.component';
import { VendorJuridicoComponent } from '../../components/initial-forms-pages/vendor-juridico/vendor-juridico.component';
import { Countries } from '../../shared/Interfaces/company_centers';
import { TypeView } from '../../shared/Interfaces/status_form';

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
  @Input() vendorId: number = 0;
  @Input() vendor: any = null;

  @Output() notify: EventEmitter<any> = new EventEmitter();

  readonly TIPOPERSONA = TIPOPERSONA;

  loading: boolean = false;
  linkDocument: any = null;
  typePersons = [
    { id: TIPOPERSONA.Natural, value: 'Natural' },
    { id: TIPOPERSONA.Juridica, value: 'Jurídica' },
  ];
  vendorForm: FormGroup;
  subs: Subscription[] = [];

  constructor(
    private _cS: VendorService,
    private router: Router,
    private fb: FormBuilder,
    private _gS: GlobalService,
  ) {
    this.vendorForm = this.fb.group({
      type_persona_id: new FormControl<number>({ value: 0, disabled: true }, Validators.compose([Validators.required, Validators.pattern(/^[1-9]\d*$/)])),
    });
  }

  ngOnInit(): void {
    if (this.vendor) {
      this.setPersonsTypes();
      this.vendorForm.get('type_persona_id')?.setValue(this.vendor?.f_person_type_id || '');
    }

    this.subs.push(this.vendorForm.valueChanges.subscribe(valor => {
      const data = {
        typeForm: TypeView.InitialForm,
        typePerson: valor['type_persona_id'],
        form: valor
      };
      this._cS.setGeneralForm(data);
    }));
  }

  setPersonsTypes() {
    if (this.vendor.country_id == Countries.Mex) {
      this.typePersons = [
        { id: TIPOPERSONA.Fisica, value: 'Fisica' },
        { id: TIPOPERSONA.Moral, value: 'Moral' },
      ];
    }
  }

  sendForm(ev: any) {
    this.loading = true;
    const formData = this._gS.setInitialForm(this.vendorForm.get('type_persona_id')?.value, ev.value);

    this._cS.updateVendor(formData).pipe(
      switchMap(() => {
        return this._cS.changeStatus();
      })
    ).subscribe(() => {
      this.router.navigate(['thanks', this.vendorId]);

      this.loading = false;
    });
  }

  updateForm() {
    const dataForm = this._cS.getGeneralForm();
    const formData = this._gS.setInitialForm(this.vendorForm.get('type_persona_id')?.value, dataForm.form);
    this._cS.updateVendor(formData).subscribe({
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
      this._cS.deleteDocument(documentId)
        .subscribe((data) => this.loading = false);
    }
    else {
      const nameFile = this._gS.normalizeString(value.name);
      this._cS.getPresignedPutURL(nameFile, ev.vendor_id).pipe(
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
            return this._cS.updateDocument({
              f_vendor_document_type_id: Number(uploadFile.id),
              link: uploadFile.url
                ? `${ev.vendor_id}/${nameFile}`
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

  ngOnDestroy() {
    this.subs.map(s => s.unsubscribe());
  }
}