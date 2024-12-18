import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CrewService } from '../../services/crew.service';
import { STATUSFORM } from '../../shared/Interfaces/status_form';
import { GlobalService } from '../../services/global.service';
import { TIPOCREW } from '../../shared/Interfaces/typo_crew';

@Component({
  selector: 'app-lateral-menu',
  standalone: true,
  imports: [],
  templateUrl: './lateral-menu.component.html',
  styleUrl: './lateral-menu.component.scss'
})
export class LateralMenuComponent {

  @Input() crew: any = null;
  @Input() typePerson: any = null;
  @Input() hideSave: boolean = false;
  @Input() typeCrew: TIPOCREW | null = null;

  TIPOCREW = TIPOCREW;

  readonly STATUSFORM = STATUSFORM;

  constructor(private auth: AuthService, private _gS: GlobalService, private _cS: CrewService) { }

  logOut() {
    this.auth.logOut(this._cS.getCrewId());
  }

  guardarProgreso() {
    const dataForm = this._cS.getGeneralForm();
    if (dataForm) {
      switch (dataForm.typeForm) {
        case STATUSFORM.Creado:
          const formData = [TIPOCREW.CrewMexico, TIPOCREW.CastMexico].includes(this.typeCrew!)
            ? this._gS.setInitialFormMx(this.typePerson, dataForm.form)
            : this._gS.setInitialForm(this.typePerson, dataForm.form);

          this._cS.updateCrewCast(formData).subscribe({
            next: () => {
              this._gS.openSnackBar('Cambios guardados', '', 5000);
            },
            error: (e: any) => {
              if (e.status == 401) this.auth.logOut(this._cS.getCrewId());
            }
          });
          break;

        case STATUSFORM.SolicitudDocumentacion:
          this._gS.openSnackBar('Cambios guardados', '', 5000);
          break;

        case STATUSFORM.CompletaVinculacion:
          const formDataVin = this._gS.setVinculationForm(dataForm.form);

          this._cS.updateVinculation(formDataVin).subscribe({
            next: () => {
              this._gS.openSnackBar('Cambios guardados', '', 5000);
            },
            error: (e: any) => {
              if (e.status == 401) this.auth.logOut(this._cS.getCrewId());
            }
          });
          break;
      }
    }
  }
}
