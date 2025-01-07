import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { TIPOCREW } from '../../../shared/Interfaces/typo_crew';
import { TIPOPERSONA } from '../../../shared/Interfaces/typo_persona';
import { STATUSFORM, VERIFICATION_DIGITS } from '../../../shared/Interfaces/status_form';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../../services/global.service';
import { CrewService } from '../../../services/crew.service';
import { withoutSpacesPoints } from '../../../shared/validators/without-spaces-points.validator';
import { info_files } from '../../../shared/Interfaces/files_types';
import { CommonModule } from '@angular/common';
import { FileboxComponent } from '../../filebox/filebox.component';
import { NgxMaskDirective } from 'ngx-mask'

@Component({
  selector: 'app-vendor-juridico',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,

    FileboxComponent,
    NgxMaskDirective,
  ],
  templateUrl: './vendor-juridico.component.html',
})
export class VendorJuridicoComponent {

  @Input() lists: any = null;
  @Input() crew: any = null;
  @Input() typePerson: any = null;

  @Output() notify: EventEmitter<any> = new EventEmitter();
  @Output() onSubmitFile: EventEmitter<any> = new EventEmitter();

  readonly TIPOCREW = TIPOCREW;
  readonly TIPOPERSONA = TIPOPERSONA;
  readonly STATUSFORM = STATUSFORM;
  readonly VERIFICATION_DIGITS = VERIFICATION_DIGITS;

  @HostListener('submit', ['$event'])
  onFormSubmit() {
    const invalidElements = this.el.nativeElement.querySelectorAll('.ng-invalid:not(.ng-submitted)');
    if (invalidElements.length > 0) {
      invalidElements[0].focus();
    }
  }

  juridicoForm: FormGroup;
  jurisdicciones: any[] = [];
  actividadesEconomicas: any[] = [];
  industrias: any[] = [];
  paises: any[] = [];
  document_type_ids: any[] = [];
  subs: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private _gS: GlobalService,
    private _cS: CrewService,
    private el: ElementRef
  ) {
    this.juridicoForm = this.fb.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      document: new FormControl('', Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(9), withoutSpacesPoints()])),
      representante_legal: new FormControl('', [Validators.required, Validators.pattern(/^[^\d]*$/)]),
      f_document_representative: new FormControl('', [Validators.required, withoutSpacesPoints()]),
      manager_name: new FormControl(''),
      manager_email: new FormControl(''),
      responsible_f_document_type_id: new FormControl(0),
      pais_id: new FormControl({value: 0, disabled: true}, Validators.compose([Validators.required, Validators.pattern(/^[1-9]\d*$/)])),
      jurisdiccion_id: new FormControl(0, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]),
      actividad_economica_id: new FormControl({ value: 0, disabled: true }, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]),
      industria_id: new FormControl(0, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]),
      pep: new FormControl(''),
      ciiu: new FormArray([]),
      pep_description: new FormControl(''),
      documento_identificacion_vendors: new FormControl('', Validators.required),
      rut_vendors: new FormControl('', Validators.required),
      camara_comercio: new FormControl('', Validators.required),
      telefono: new FormControl('', [Validators.required, Validators.pattern('^[0-9+-]+$')]),
      direccion: new FormControl('', Validators.required),
      type_regimen_id: new FormControl(null, Validators.required),
      document_type_id: new FormControl(null, Validators.required),
      requires_external_staff: new FormControl(null, Validators.required),
      employees_number: new FormControl(null),
      lr_actor: new FormControl(''),
      actor_pep: new FormControl(''),
      actor_name: new FormControl(''),
      actor_document: new FormControl(''),
      documento_identificacion_actor: new FormControl(''),
      manager_telephone: new FormControl(''),
      autorizacion_datos: new FormControl(false, Validators.compose([Validators.requiredTrue])),
      actor_pep_description: new FormControl(''),
      verification_digit: new FormControl(null, Validators.required),
    });
  }

  get ciiu() {
    return this.juridicoForm.get('ciiu') as FormArray;
  }

  ngOnInit(): void {
    this.setData();
    //Subscription
    this.subs.push(this.juridicoForm.valueChanges.subscribe(valor => {
      Object.keys(this.juridicoForm.controls).forEach((controlName: any) => {
        const control = this.juridicoForm.get(controlName);
        if (control && control.dirty) {
          const foundKey = Object.keys(info_files).find((key: any) => info_files[key] === controlName);
          if (foundKey) {
            const fileData = {
              formControlName: controlName,
              value: control?.value?.file,
              crew_id: this._cS.getCrewId(),
            };
            this.onSubmitFile.emit(fileData);
            control.markAsPristine();
          }
        }
      });
      var data = {
        typeForm: STATUSFORM.Creado,
        typePerson: TIPOPERSONA.Juridica,
        form: valor
      };
      this._cS.setGeneralForm(data);
    }));
  }

  setData() {
    this.jurisdicciones = this.lists['jurisdicciones'];
    this.actividadesEconomicas = this.lists['actividadesEconomicas'];
    this.industrias = this.lists['industrias'];
    this.paises = this.lists['paises'];
    this.actividadesEconomicas = this.lists['economicActivities'];
    this.document_type_ids = this.lists['document_type_ids'];

    if (this.crew) {
      this._gS.setEditInitialForm(this.juridicoForm, this.crew);
    }
    this.updateControls();
  }

  submitForm() {
    console.log(this.juridicoForm);
    if (!this.juridicoForm.invalid) {
      this.notify.emit(this.juridicoForm);
    }
    else {
      Object.values(this.juridicoForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  setDescriptionControl(control: any, nameControl: string) {
    if (control == 1) {
      this.juridicoForm.get(`${nameControl}_description`)?.setValidators(Validators.required);
      this.juridicoForm.get(`${nameControl}_description`)?.updateValueAndValidity();
    }
    else {
      this.juridicoForm.get(`${nameControl}_description`)?.removeValidators(Validators.required);
      this.juridicoForm.get(`${nameControl}_description`)?.updateValueAndValidity();
    }
  }

  setActorControls() {
    this.juridicoForm.get(`actor_name`)?.setValidators(Validators.required);
    this.juridicoForm.get(`actor_document`)?.setValidators(Validators.required);
    this.juridicoForm.get(`actor_pep`)?.setValidators(Validators.required);
    this.juridicoForm.get(`documento_identificacion_actor`)?.setValidators(Validators.required);
    this.updateControls();
  }

  updateControls() {
    Object.values(this.juridicoForm.controls).forEach((control) => {
      control.updateValueAndValidity();
    });
  }

  get fJuridico() {
    return this.juridicoForm.controls;
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
