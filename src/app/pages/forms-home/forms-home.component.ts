import { Component, OnInit } from '@angular/core';
import { CrewService } from '../../services/crew.service';
import { ActivatedRoute } from '@angular/router';
import { STATUSFORM, TypeView } from '../../shared/Interfaces/status_form';
import { COMPANYCENTERS } from '../../shared/Interfaces/company_centers';
import { InitialFormComponent } from '../initial-form/initial-form.component';
import { WelcomePendingComponent } from '../welcome-pending/welcome-pending.component';
import { VinculationFormComponent } from '../vinculation-form/vinculation-form.component';
import { DocumentationFormComponent } from '../documentation-form/documentation-form.component';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { TIPOCREW } from '../../shared/Interfaces/typo_crew';
import { TIPOPERSONA } from '../../shared/Interfaces/typo_persona';

@Component({
  selector: 'app-forms-home',
  standalone: true,
  imports: [InitialFormComponent, WelcomePendingComponent, VinculationFormComponent, DocumentationFormComponent],
  templateUrl: './forms-home.component.html',
  styleUrl: './forms-home.component.scss'
})
export class FormsHomeComponent implements OnInit {

  readonly STATUSFORM = STATUSFORM;
  readonly TypeView = TypeView;
  readonly COMPANYCENTERS = COMPANYCENTERS;

  loading: boolean = false;
  crewId: any = null;
  lists: any = {};
  crew: any = null;
  typeCrew: TIPOCREW | null = null;
  crewResponseDetail: any = null;
  documents: any[] = [];
  subs: Subscription[] = [];
  companyCenter: any = null;
  crewAnswers: any[] = [];
  typeView: TypeView | null = null;

  constructor (private _cS: CrewService, private route: ActivatedRoute, private auth: AuthService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.crewId = params.id;
      this._cS.setCrewId(params.id);
      this.loadData();
    })
  }

  loadData() {
    this.loading = true;

    this.subs.push(this._cS.getCrewInfo().subscribe({
      next: (data: any) => {
        this.lists['jurisdicciones'] = data.jurisdiction || [];
        this.lists['actividadesEconomicas'] = data.economic_activity || [];
        this.lists['industrias'] = data.industry || [];
        this.lists['paises'] = data.countries || [];
        this.lists['document_type_ids'] = data.f_document_type_ids || [];
        this.lists['economicActivities'] = data.economic_activity || [];
        this.lists['typeRegimens'] = data.f_contractor_regime_type || [];
        this.lists['typeAccounts'] = data.f_vendor_bank_account_types || [];
        this.lists['alcaldias'] = data.f_public_admin_mex_types || [];
        this.lists['rFiscales'] = data.f_contractor_regime_type || [];
        this.lists['generos'] = data.gender || [];
        this.lists['tiposSangre'] = data.blood_type || [];
        this.lists['crewResponseDetail'] = data.crew_response_detail;
        this.crew = data.vendor[0] || null;
        this.crew.ciiu = data?.ciiu || [];
        this.crewAnswers = data.f_vendor_inf_add_types_aswered || [];
        this.typeCrew = data?.type_crew || null;
        this.typeView = data?.type_view || null;

        this._cS.setDocumentsList(data.document_vendor);

        this.loading = false;
      },
      error: (e: any) => {
        if (e.status == 401) this.auth.logOut(this.crewId);
      }
    }));
  }

  ngOnDestroy() {
    this.subs.map(s => s.unsubscribe());
  }
}
