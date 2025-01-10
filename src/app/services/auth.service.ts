import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';
import { shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginApiUrl: string = environment.apiUrlFront;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient, private route: ActivatedRoute) { }

  loginCrew(token: string, vendorId: number, requestId?: number | null) {
    let params = new HttpParams().set('token', token);
    params = params.set('id', vendorId.toString());
    if (requestId) params = params.set('fm_request_po_id', requestId.toString());

    return this.http.get(`${environment.apiUrl}finance_manager/validateToken`, {params}).pipe(
      tap(res => this.setCrewSession(res)),
      shareReplay(1)
    )
  }

  private setCrewSession(authResult: any) {
    localStorage.setItem('id_crew_token', authResult.vendor_token);
  }

  generateCrewToken(vendorId: any, requestId?: number | null) {
    return this.http.post(`${environment.apiUrl}finance_manager/sendToken`, { id: vendorId, fm_request_po_id: requestId }).pipe(
      shareReplay(1)
    )
  }

  async getSession() {
    let sessionToken = await this.getToken();
    if (sessionToken) return true;
    else return false;
  }

  async getToken() {
    const value = localStorage.getItem('id_crew_token');
    return value;
  }

  getValueToken() {
    const value = localStorage.getItem('id_crew_token');
    if (value)
      return value;
    else return null;
  }

  logOut(vendorId: number) {
    localStorage.clear();
    window.location.href = this.loginApiUrl + 'home/' + vendorId;
  }
}
