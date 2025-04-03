import { Component, OnDestroy, OnInit } from '@angular/core';
import { VendorService } from '../../services/vendor.service';
import { ActivatedRoute } from '@angular/router';
import { TypeView } from '../../shared/Interfaces/status_form';
import { COMPANYCENTERS } from '../../shared/Interfaces/company_centers';
import { InitialFormComponent } from '../initial-form/initial-form.component';
import { WelcomePendingComponent } from '../welcome-pending/welcome-pending.component';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forms-home',
  standalone: true,
  imports: [InitialFormComponent, WelcomePendingComponent],
  templateUrl: './forms-home.component.html',
  styleUrl: './forms-home.component.scss'
})
export class FormsHomeComponent implements OnInit, OnDestroy {

  readonly TypeView = TypeView;
  readonly COMPANYCENTERS = COMPANYCENTERS;

  loading: boolean = false;
  vendorId: number = 0;
  lists: any = {};
  vendor: any = null;
  documents: any[] = [];
  subs: Subscription[] = [];
  companyCenter: any = null;
  typeView: TypeView | null = null;

  constructor(
    private _cS: VendorService,
    private route: ActivatedRoute,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.vendorId = Number(params?.id);
      this._cS.setVendorId(params?.id);

      this.loadData();
    })
  }

  loadData() {
    this.loading = true;

    this.subs.push(this._cS.getVendorInfo().subscribe({
      next: (data: any) => {
        this.lists['jurisdicciones'] = data.jurisdiction || [];
        this.lists['foreigner_jurisdiction'] = data.foreigner_jurisdiction || [];
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

        this.vendor = data.vendor[0] || null;
        this.vendor.ciiu = data?.ciiu || [];
        this.typeView = data?.type_view || null;

        data?.document_vendor?.map((doc: any) => {
          doc.name = doc.link;
        });

        this._cS.setDocumentsList(data.document_vendor);

        this.loading = false;
      },
      error: (e: any) => {
        if (e.status == 401) this.auth.logOut(this.vendorId);
      }
    }));
  }

  ngOnDestroy() {
    this.subs.map(s => s.unsubscribe());
  }
}
