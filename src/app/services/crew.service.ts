import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrewService {

  tokenSession: any = null;
  private headers: HttpHeaders | undefined;
  private _generalForm: any = null;
  private _crewId: any = null;
  private _documentsList: any[] = [];

  setGeneralForm(data: any) {
    this._generalForm = null;
    this._generalForm = data;
  }

  getGeneralForm() {
    return this._generalForm;
  }

  setCrewId(data: any) {
    this._crewId = null;
    this._crewId = data;
  }

  getCrewId() {
    return this._crewId;
  }

  setDocumentsList(data: any[]) {
    this._documentsList = [];
    this._documentsList = data;
  }

  getDocumentsList() {
    return this._documentsList;
  }

  setHeaders() {
    this.tokenSession = this.auth.getValueToken();
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenSession}`
    });
  }

  getCrewInfo() {
    this.setHeaders();
    return this.http.get(`${environment.apiUrl}finance_manager/detail_provider`, {
      headers: this.headers,
    });
  }

  updateCrewCast(values: any) {
    return this.http.post(`${environment.apiUrl}finance_manager/update_provider`, values, { headers: this.headers}).pipe(
      map((response: any) => response));
  }

  getCrewEmail(crew_id: any) {
    return this.http.get(`${environment.apiUrl}dynamo/get_crew_and_cast_id`, {
      params: new HttpParams()
        .set('id', crew_id)
    });
  }

  getVinculationInfo(requestId: number) {
    this.setHeaders();
    return this.http.get(`${environment.apiUrl}finance_manager/vinculation_po_request`, {
      headers: this.headers,
      params: new HttpParams()
        .set('fm_request_po_id', requestId?.toString()),
    });
  }

  changeStatus(params: any = {}) {
    this.setHeaders();
    return this.http.post(`${environment.apiUrl}finance_manager/get_send_verification`, params, { headers: this.headers }).pipe(
      map((response: any) => response));
  }

  updateVinculation(values: any) {
    this.setHeaders();
    return this.http.post(`${environment.apiUrl}finance_manager/save_po_vinculation_details`, values, { headers: this.headers }).pipe(
      map((response: any) => response));
  }

  getDocumentsData() {
    this.setHeaders();
    return this.http.get(`${environment.apiUrl}dynamo/get_required_documents_List`, {
      headers: this.headers,
      params: new HttpParams()
    });
  }

  getPresignedPutURL(filename: string, folder: string) {
    this.setHeaders();
    let params = {
			'filename': filename,
			'vendor_id': folder
		};
		return this.http
			.post(`${environment.apiUrl}finance/getPresignedUrlService`, params, { headers: this.headers })
			.pipe(map(response => response));
  }

  uploadFileUrlPresigned(file: any, uploadUrl: string, contentType:string): Observable<any> {
		const headers = new HttpHeaders({'Content-Type': contentType, 'Accept': '*/*'});
		const req = new HttpRequest(
			'PUT', uploadUrl, file, {
			headers: headers
		});
		return this.http.request(req);
	}

  updateCrewDocument(formData: any){
    this.setHeaders();
    return this.http.post(`${environment.apiUrl}finance_manager/add_document_provider`, {...formData}, { headers: this.headers })
    .pipe(map( response => response))
  }

  deleteCrewDocument(documentId: any){
    this.setHeaders();

    let params = new HttpParams().set('document_id', documentId);

    return this.http.delete(`${environment.apiUrl}finance_manager/delete_document_vendor`, {
      params: params,
      headers: this.headers
    })
    .pipe(map( response => response))
  }

  constructor(private http: HttpClient, private auth: AuthService) {
  }
}
