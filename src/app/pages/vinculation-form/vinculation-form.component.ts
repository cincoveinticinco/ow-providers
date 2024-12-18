import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TIPOCREW } from '../../shared/Interfaces/typo_crew';
import { HeaderComponent } from '../../components/header/header.component';
import { LateralMenuComponent } from '../../components/lateral-menu/lateral-menu.component';
import { CrewService } from '../../services/crew.service';
import { AuthService } from '../../services/auth.service';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { PreviousAnswersVendorComponent } from '../../components/vinculation-pages/previous-answers-vendor/previous-answers-vendor.component';
import { VinculationVendorComponent } from '../../components/vinculation-pages/vinculation-vendor/vinculation-vendor.component';
import { AcceptNegotiationConditionsComponent } from "../../components/accept-negotiation-conditions/accept-negotiation-conditions.component";
import { TIPOPERSONA } from '../../shared/Interfaces/typo_persona';

@Component({
  selector: 'app-vinculation-form',
  standalone: true,
  imports: [
    HeaderComponent,
    LateralMenuComponent,
    PreviousAnswersVendorComponent,
    VinculationVendorComponent,
    AcceptNegotiationConditionsComponent
],
  templateUrl: './vinculation-form.component.html',
  styleUrl: './vinculation-form.component.scss'
})
export class VinculationFormComponent implements OnInit{

  readonly TIPOCREW = TIPOCREW;
  readonly TIPOPERSONA = TIPOPERSONA;

  @Input() typeCrew: any = null;
  @Input() crew: any = null;

  @Output() notify: EventEmitter<any> = new EventEmitter();

  crewResponseDetail: any = null;
  crewAnswers: any[] = [];
  loading: boolean = false;
  lists: any = {};
  view: string = '';
  currentForm: any = null;

  constructor(private _cS: CrewService, private auth: AuthService, private router: Router, private _gS: GlobalService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this._cS.getVinculationInfo(this._cS.getCrewId()).subscribe({
      next: (data: any) => {
        this.lists['generos'] = data.gender || [];
        this.lists['tiposSangre'] = data.blood_type || [];
        this.lists['arls'] = data.arl || [];
        this.lists['typeRegimens'] = data.f_contractor_regime_type || [];
        this.lists['typeRegimensCompanies'] = data.f_type_of_company_regimes || [];
        this.lists['typeAccounts'] = data.f_vendor_bank_account_types || [];
        this.lists['epss'] = data.f_type_contributing_epses || [];
        this.lists['regimenMethods'] = data.f_payment_regime_methods || [];
        this.crewResponseDetail = data.crew_response_detail;

        if (this.crewResponseDetail?.notes) {
          this.crewResponseDetail.notes = this.crewResponseDetail.notes?.replace(/\n/g, '<br>');
        }
        this.crewAnswers = data.f_vendor_inf_add_types_aswered || [];

        this.loading = false;
      },
      error: (e: any) => {
        if (e.status == 401) this.auth.logOut(this._cS.getCrewId());
      }
    });
  }

  submitForm(ev: any) {
    this.currentForm = ev;

    if (this.typeCrew == TIPOCREW.Cast) {
      this.view = 'viewNegotiationConditions';
    } else {
      this.sendForm();
    }
  }

  sendForm(declineNegotiationConditions: boolean = false, reason?: string) {
    this.loading = true;
    this.changeView();

    const formData = this._gS.setVinculationForm(this.currentForm?.value);

    this._cS.updateVinculation(formData).pipe(
      switchMap(() => {
        var params: any = { second_form: true };
        if (declineNegotiationConditions) params['decline'] = true;
        if (reason) params['decline_comment'] = reason;

        return this._cS.changeStatus(params);
      })
    ).subscribe(() => {
        this.loading = false;
        this.notify.emit();
    });
  }

  changeView(newView: string = '') {
    this.view = newView;
  }

}
