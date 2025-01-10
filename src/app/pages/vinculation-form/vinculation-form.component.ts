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

  crew: any = null;

  crewAnswers: any[] = [];
  loading: boolean = false;
  lists: any = {};
  view: string = '';
  currentForm: any = null;
  requestId: number = 0;

  constructor(
    private _cS: VendorService,
    private auth: AuthService,
    private router: Router,
    private _gS: GlobalService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.requestId = Number(params.requestId);
      this.loadData();
    });
  }

  loadData() {
    this.loading = true;
    this._cS.getVinculationInfo(this.requestId).subscribe({
      next: (data: any) => {
        this.crew = data?.data;
        this.crew.id = this.requestId
        this.lists['typeAccounts'] = data?.data?.account_types || [];
        this.crewAnswers = this.crew.questions || [];

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

  sendForm(declineNegotiationConditions: boolean = false, reason?: string) {
    this.loading = true;
    this.changeView();

    const formData = this._gS.setVinculationForm(this.currentForm?.value, true);

    this._cS.updateVinculation(formData).pipe(
      switchMap(() => {
        var params: any = { second_form: true };
        if (declineNegotiationConditions) params['decline'] = true;
        if (reason) params['decline_comment'] = reason;

        return this._cS.changeStatus(params);
      })
    ).subscribe(() => {
        this.loading = false;
        //this.notify.emit();
    });
  }

  changeView(newView: string = '') {
    this.view = newView;
  }

}
