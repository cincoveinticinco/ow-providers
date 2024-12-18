import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { InputTokenComponent } from '../../components/input-token/input-token.component';
import { FormsModule } from '@angular/forms';
import { CrewService } from '../../services/crew.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, InputTokenComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  error: string = '';
  view: string = 'home';
  crewCastEmailSecret: string = '';
  token: string = '';
  vendorId: number = 0;
  loading: boolean = false;
  subs: Subscription[] = [];

  constructor(
    private _cS: CrewService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subs.push(this.route.params.subscribe((params: any) => {
      this.vendorId = Number(params.id);
    }));
  }


  requestToken() {

  }

  generateToken(){
    this.loading = true;
    this.error = '';
    this.subs.push(this.auth.generateCrewToken(this.vendorId).subscribe((data:any) => {
      this.crewCastEmailSecret = data.email;
      if(data.error){
        this.error = data.msg;
        this.loading = false;
        return;
      }
      this.loading = false;
    }));
  }

  setView(view: string) {
    this.view = view;
  }

  sendToken(){
    this.loading = true;
    this.subs.push(this.auth.loginCrew(this.token, this.vendorId).subscribe((data:any) => {
      if(data.error){
        this.error = data.msg;
        this.loading = false;
        return;
      }
      this.loading = false;
      this.router.navigate(['complete-form', this.vendorId]);
    }));
  }

  ngOnDestroy() {
    this.subs.map(s => s.unsubscribe());
  }
}
