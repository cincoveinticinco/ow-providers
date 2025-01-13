import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { InputTokenComponent } from '../../components/input-token/input-token.component';
import { FormsModule } from '@angular/forms';
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
  vendorEmailSecret: string = '';
  token: string = '';
  vendorId: number = 0;
  serviceTypeId: number | null = null;
  loading: boolean = false;
  subs: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subs.push(this.route.params.subscribe((params: any) => {
      this.vendorId = Number(params.id);
      this.serviceTypeId = Number(params?.serviceTypeId) || null;
    }));
  }


  generateToken(){
    this.loading = true;
    this.error = '';
    this.subs.push(this.auth.generateVendorToken(this.vendorId, this.serviceTypeId).subscribe((data:any) => {
      this.vendorEmailSecret = data.email;
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
    this.subs.push(this.auth.loginVendor(this.token, this.vendorId, this.serviceTypeId).subscribe((data:any) => {
      if(data.error){
        this.error = data.msg;
        this.loading = false;
        return;
      }

      switch (data?.type_view) {
        case 1:
          this.router.navigate(['complete-form', this.vendorId]);
          break;
        case 2:
          this.router.navigate(['vinculation', this.vendorId, 'request', this.serviceTypeId]);
          break;
        case 3:
          this.router.navigate(['documents', this.vendorId, 'request', this.serviceTypeId]);
          break;
        default:
          this.router.navigate(['thanks', this.vendorId]);
          break;
      }

    }));
  }

  ngOnDestroy() {
    this.subs.map(s => s.unsubscribe());
  }
}
