import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { VendorService } from '../../services/vendor.service';
import { GlobalService } from '../../services/global.service';
import { TypeView } from '../../shared/Interfaces/status_form';

@Component({
  selector: 'app-lateral-menu',
  standalone: true,
  imports: [],
  templateUrl: './lateral-menu.component.html',
  styleUrl: './lateral-menu.component.scss'
})
export class LateralMenuComponent {

  @Input() typePerson: any = null;
  @Input() hideSave: boolean = false;

  constructor(private auth: AuthService, private _gS: GlobalService, private _cS: VendorService) { }

  logOut() {
    this.auth.logOut(this._cS.getVendorId());
  }

  guardarProgreso() {
    const dataForm = this._cS.getGeneralForm();
    if (dataForm) {
      switch (dataForm.typeForm) {
        case TypeView.InitialForm:
          const formData = this._gS.setInitialForm(this.typePerson, dataForm.form);

          this._cS.updateVendor(formData).subscribe({
            next: () => {
              this._gS.openSnackBar('Cambios guardados', '', 5000);
            },
            error: (e: any) => {
              if (e.status == 401) this.auth.logOut(this._cS.getVendorId());
            }
          });
          break;

        case TypeView.VinculationForm:
          const formDataVin = this._gS.setVinculationForm(dataForm.form);

          this._cS.updateVinculation(formDataVin).subscribe({
            next: () => {
              this._gS.openSnackBar('Cambios guardados', '', 5000);
            },
            error: (e: any) => {
              if (e.status == 401) this.auth.logOut(this._cS.getVendorId());
            }
          });
          break;

        case TypeView.Docs:
          this._gS.openSnackBar('Cambios guardados', '', 5000);
          break;
      }
    }
  }
}
