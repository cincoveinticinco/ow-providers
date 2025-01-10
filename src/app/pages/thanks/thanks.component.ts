import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { VendorService } from '../../services/vendor.service';
import { AuthService } from '../../services/auth.service';
import { LateralMenuComponent } from '../../components/lateral-menu/lateral-menu.component';

@Component({
  selector: 'app-thanks',
  standalone: true,
  imports: [RouterModule, LateralMenuComponent],
  templateUrl: './thanks.component.html',
  styleUrl: './thanks.component.scss'
})
export class ThanksComponent implements OnInit{

  vendorId: number = 0;
  loading: boolean = false;
  typeRoute: string = '';

  constructor(private route: ActivatedRoute, private _cS: VendorService, private auth: AuthService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.vendorId = Number(params?.id);
      this.typeRoute = this.route.snapshot.data['type'];
      this.loadData();
    })
  }

  loadData() {
    this._cS.getVendorInfo().subscribe({
      error: (e: any) => {
        if (e.status == 401) this.auth.logOut(this.vendorId);
      }
    })
  }
}
