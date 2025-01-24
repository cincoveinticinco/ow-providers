import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { LateralMenuComponent } from '../../components/lateral-menu/lateral-menu.component';
import { VendorService } from '../../services/vendor.service';
import { AuthService } from '../../services/auth.service';
import { switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { PreviousAnswersVendorComponent } from '../../components/vinculation-pages/previous-answers-vendor/previous-answers-vendor.component';
import { VinculationVendorComponent } from '../../components/vinculation-pages/vinculation-vendor/vinculation-vendor.component';
import { TIPOPERSONA } from '../../shared/Interfaces/typo_persona';

@Component({
  selector: 'app-vinculation-form',
  standalone: true,
  imports: [
    HeaderComponent,
    LateralMenuComponent,
    PreviousAnswersVendorComponent,
    VinculationVendorComponent,
],
  templateUrl: './vinculation-form.component.html',
  styleUrl: './vinculation-form.component.scss'
})
export class VinculationFormComponent implements OnInit{

  readonly TIPOPERSONA = TIPOPERSONA;

  serviceType: any = null;

  poRequestAnswers: any[] = [];
  loading: boolean = false;
  lists: any = {};
  view: string = '';
  currentForm: any = null;
  serviceTypeId: number = 0;

  constructor(
    private _cS: VendorService,
    private auth: AuthService,
    private _gS: GlobalService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.serviceTypeId = Number(params?.serviceTypeId);
      this._cS.setVendorId(Number(params?.id));
      this.loadData();
    });
  }

  loadData() {
    this.loading = true;
    this._cS.getVinculationInfo(this.serviceTypeId).subscribe({
      next: (data: any) => {
        this.serviceType = data?.data;
        this.serviceType.id = this.serviceTypeId
        this.lists['typeAccounts'] = data?.data?.account_types || [];
        this.poRequestAnswers = this.serviceType.questions || [];

        this.loading = false;
      },
      error: (e: any) => {
        if (e.status == 401) this.auth.logOut(this._cS.getVendorId());
      }
    });
  }

  submitForm(ev: any) {
    this.currentForm = ev;

    this.sendForm();
  }

  sendForm() {
    this.loading = true;
    this.changeView();

    const formData = this._gS.setVinculationForm(this.currentForm?.value, true);

    this._cS.updateVinculation(formData).subscribe({
      next: (data: any) => {
        this.router.navigate(['documents', this._cS.getVendorId(), 'request', this.serviceTypeId]);
      }
    });
  }

  changeView(newView: string = '') {
    this.view = newView;
  }

}
