import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { TIPOPERSONA } from '../../../shared/Interfaces/typo_persona';
import { STATUSFORM } from '../../../shared/Interfaces/status_form';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CrewService } from '../../../services/crew.service';
import { GlobalService } from '../../../services/global.service';
import { info_files } from '../../../shared/Interfaces/files_types';
import { withoutSpacesPoints } from '../../../shared/validators/without-spaces-points.validator';
import { CommonModule } from '@angular/common';
import { FileboxComponent } from '../../filebox/filebox.component';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-vendor-natural',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,

    FileboxComponent,
    NgxMaskDirective,
  ],
  templateUrl: './vendor-natural.component.html',
})
export class VendorNaturalComponent {

  @Input() lists: any = null;
  @Input() crew: any = null;
  @Input() typePerson: any = null;

  @Output() notify: EventEmitter<any> = new EventEmitter();
  @Output() onSubmitFile: EventEmitter<any> = new EventEmitter();

  @HostListener('submit', ['$event'])
  onFormSubmit() {
    const invalidElements = this.el.nativeElement.querySelectorAll('.ng-invalid:not(.ng-submitted)');
    if (invalidElements.length > 0) {
      invalidElements[0].focus();
    }
  }

  readonly TIPOPERSONA = TIPOPERSONA;
  readonly STATUSFORM = STATUSFORM;

  naturalForm: FormGroup;
  document_type_ids: any[] = [];
  jurisdicciones: any[] = [];
  actividadesEconomicas: any[] = [];
  industrias: any[] = [];
  paises: any[] = [];
  loading: boolean = true;
  linkDocument: any = null;
  subs: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private _cS: CrewService,
    public _gS: GlobalService,
    private el: ElementRef
  ) {
    this.naturalForm = this.fb.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      document_type_id: new FormControl(0, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]),
      document: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), withoutSpacesPoints()])),
      lugar_expedicion: new FormControl('', [Validators.required, Validators.pattern(/^[^\d]*$/)]),
      nacionalidad: new FormControl('', Validators.required),
      telefono: new FormControl('', [Validators.required, Validators.pattern('^[0-9+-]+$')]),
      direccion: new FormControl('', Validators.required),
      type_regimen_id: new FormControl(null, Validators.required),
      rut_vendors: new FormControl(null, Validators.required),
      pais_id: new FormControl({value: 0, disabled: true}),
      jurisdiccion_id: new FormControl(0),
      actividad_economica_id: new FormControl(0),
      industria_id: new FormControl(0),
      pep: new FormControl('', Validators.required),
      pep_description: new FormControl(''),
      documento_identificacion_vendors: new FormControl('', Validators.required),
      autorizacion_datos: new FormControl(false, Validators.compose([Validators.requiredTrue])),
      ciiu: new FormArray([]),
    });
  }

  ngOnInit(): void {
    this.setData();
    //Subscription
    this.subs.push(this.naturalForm.valueChanges.subscribe(valor => {
      Object.keys(this.naturalForm.controls).forEach((controlName: string) => {
        const control = this.naturalForm.get(controlName);
        if (control && control.dirty) {
          const foundKey = Object.keys(info_files).find((key: any) => info_files[key] === controlName);
          if (foundKey) {
            const fileData = {
              formControlName: controlName,
              value: control.value?.file,
              crew_id: this._cS.getCrewId(),
            };
            this.onSubmitFile.emit(fileData);
            control.markAsPristine();
          }
        }
      });
      var data = {
        typeForm: STATUSFORM.Creado,
        typePerson: TIPOPERSONA.Natural,
        form: valor
      };
      this._cS.setGeneralForm(data);
    }));
  }

  setData() {
    this.jurisdicciones = this.lists['jurisdicciones'];
    this.actividadesEconomicas = this.lists['economicActivities'];
    this.industrias = this.lists['industrias'];
    this.paises = this.lists['paises'];
    this.document_type_ids = this.lists['document_type_ids'];
    if (this.crew) {
      this._gS.setEditInitialForm(this.naturalForm, this.crew);
    }
    if (this.typePerson == TIPOPERSONA.Natural) {
      this.naturalForm.get(`pais_id`)?.setValidators([Validators.required, Validators.pattern(/^[1-9]\d*$/)]);
      this.naturalForm.get(`jurisdiccion_id`)?.setValidators([Validators.required, Validators.pattern(/^[1-9]\d*$/)]);
      this.naturalForm.get(`actividad_economica_id`)?.setValidators([Validators.required, Validators.pattern(/^[1-9]\d*$/)]);
      this.naturalForm.get(`industria_id`)?.setValidators([Validators.required, Validators.pattern(/^[1-9]\d*$/)]);
    }
  }

  submitForm() {
    if (!this.naturalForm.invalid) {
      this.notify.emit(this.naturalForm);
    }
    else {
      Object.values(this.naturalForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  isFile(control: FormControl): boolean {
    return control.value instanceof FileList;
  }

  setDescriptionControl(control: any, nameControl: string) {
    if (control == 1) {
      this.naturalForm.get(`${nameControl}_description`)?.setValidators(Validators.required);
      this.naturalForm.get(`${nameControl}_description`)?.updateValueAndValidity();
    }
    else {
      this.naturalForm.get(`${nameControl}_description`)?.removeValidators(Validators.required);
      this.naturalForm.get(`${nameControl}_description`)?.updateValueAndValidity();
    }
  }

  get fNatural() {
    return this.naturalForm.controls;
  }

  get ciiu() {
    return this.naturalForm.get('ciiu') as FormArray;
  }

  addCiiu() {
    this.ciiu.push(new FormControl('', Validators.pattern('^[0-9]*$')));
  }

  deleteCiiu(index: number) {
    this.ciiu.removeAt(index);
  }

  ngOnDestroy() {
    this.subs.map(s => s.unsubscribe());
  }

}
