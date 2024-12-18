import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CrewService } from '../../services/crew.service';
import { AuthService } from '../../services/auth.service';
import { STATUSFORM } from '../../shared/Interfaces/status_form';
import { LateralMenuComponent } from '../../components/lateral-menu/lateral-menu.component';

@Component({
  selector: 'app-thanks',
  standalone: true,
  imports: [RouterModule, LateralMenuComponent],
  templateUrl: './thanks.component.html',
  styleUrl: './thanks.component.scss'
})
export class ThanksComponent implements OnInit{

  readonly STATUSFORM = STATUSFORM;

  crewId: any = null;
  loading: boolean = false;
  crew: any = null;
  typeRoute: string = '';

  constructor(private route: ActivatedRoute, private _cS: CrewService, private auth: AuthService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.crewId = params.id;
      this.typeRoute = this.route.snapshot.data['type'];
      this.loadData();
    })
  }

  loadData() {
    this._cS.getCrewInfo().subscribe({
      next: (data: any) => {
        this.crew = data.crew[0] || null;
        this.loading = false;
      },
      error: (e: any) => {
        if (e.status == 401) this.auth.logOut(this.crewId);
      }
    })
  }
}
