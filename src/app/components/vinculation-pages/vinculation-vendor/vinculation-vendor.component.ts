import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { STATUSFORM } from '../../../shared/Interfaces/status_form';
import { TIPOPERSONA } from '../../../shared/Interfaces/typo_persona';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../../services/global.service';
import { CrewService } from '../../../services/crew.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-vinculation-vendor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './vinculation-vendor.component.html',
})
export class VinculationVendorComponent {

  @Input() lists: any = null;
  @Input() typeCrew: any = null;
  @Input() crew: any = null;
  @Input() crewAnswers: any[] = [];
  @Input() personType: any = null;

  @Output() notify: EventEmitter<any> = new EventEmitter();

  @HostListener('submit', ['$event'])
  onFormSubmit() {
    const invalidElements = this.el.nativeElement.querySelectorAll('.ng-invalid:not(.ng-submitted)');
    if (invalidElements.length > 0) {
      invalidElements[0].focus();
    }
  }

  readonly STATUSFORM = STATUSFORM;
  readonly TIPOPERSONA = TIPOPERSONA;
  readonly apiUrlFront = environment.apiUrlFront;

  vinculationForm: FormGroup;
  subs: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    public _gS: GlobalService,
    private _cS: CrewService,
    private el: ElementRef
  ) {
    this.vinculationForm = this.fb.group({
      //Yes or no
      autorizacion_media: new FormControl('', Validators.required),
      datos_otros: new FormControl('', Validators.required),
      permisos_eventos: new FormControl('', Validators.required),
      poliza: new FormControl('', Validators.required),
      vinculo: new FormControl('', Validators.required),
      vinculo_description: new FormControl(''),
      relacion: new FormControl('', Validators.required),
      relacion_description: new FormControl(''),
      requirements: new FormControl('', Validators.required),
      data_verification: new FormControl('', Validators.required),
      pec: new FormControl('', Validators.required),
      ethics_manual: new FormControl('', Validators.required),
      anti_corruption: new FormControl('', Validators.required),
      anti_corruption_description: new FormControl(''),
      good_faith: new FormControl('', Validators.required),
      third_parties: new FormControl('', Validators.required),
      oath: new FormControl('', Validators.required),
      numero_cuenta: new FormControl(null, Validators.required),
      nombre_banco: new FormControl('', Validators.required),
      type_cuenta_id: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    if (this.typeCrew) {
      this.vinculationForm.addControl('type_crew_id', new FormControl(0, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]));
    }
    if (this.crew) {
      this._gS.setEditVinculationForm(this.vinculationForm, this.crew, this.crewAnswers);
    }
    //Subscription
    this.subs.push(this.vinculationForm.valueChanges.subscribe(valor => {
      var data = {
        typeForm: STATUSFORM.CompletaVinculacion,
        form: valor
      };
      this._cS.setGeneralForm(data);
    }));
  }

  submitForm() {
    if (!this.vinculationForm.invalid) {
      this.notify.emit(this.vinculationForm);
    }
    else {
      Object.values(this.vinculationForm.controls).forEach((control) => {
        control.markAsTouched();
        control.markAsDirty();
      });
    }
  }

  setDescriptionControl(control: any, nameControl: string) {
    if (control == 1) {
      this.vinculationForm.get(`${nameControl}_description`)?.setValidators(Validators.required);
      this.vinculationForm.get(`${nameControl}_description`)?.updateValueAndValidity();
    }
    else {
      this.vinculationForm.get(`${nameControl}_description`)?.removeValidators(Validators.required);
      this.vinculationForm.get(`${nameControl}_description`)?.updateValueAndValidity();
    }
  }

  get fVinculation() {
    return this.vinculationForm.controls;
  }

  ngOnDestroy() {
    this.subs.map(s => s.unsubscribe());
  }

}
