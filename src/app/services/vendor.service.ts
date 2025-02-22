import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  tokenSession: any = null;
  private headers: HttpHeaders | undefined;
  private _generalForm: any = null;
  private _vendorId: number = 0;
  private _documentsList: any[] = [];

  setGeneralForm(data: any) {
    this._generalForm = null;
    this._generalForm = data;
  }

  getGeneralForm() {
    return this._generalForm;
  }

  setVendorId(data: number) {
    this._vendorId = 0;
    this._vendorId = data;
  }

  getVendorId() {
    return this._vendorId;
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

  getVendorInfo() {
    this.setHeaders();
    return this.http.get(`${environment.apiUrl}finance_manager/detail_provider`, {
      headers: this.headers,
    });
  }

  updateVendor(values: any) {
    return this.http.post(`${environment.apiUrl}finance_manager/update_provider`, values, { headers: this.headers}).pipe(
      map((response: any) => response));
  }

  getVinculationInfo(serviceTypeId: number) {
    this.setHeaders();
    return this.http.get(`${environment.apiUrl}finance_manager/vinculation_po_request`, {
      headers: this.headers,
      params: new HttpParams()
        .set('fm_request_po_id', serviceTypeId?.toString()),
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

  getDocumentsData(serviceTypeId: number) {
    this.setHeaders();
    return this.http.get(`${environment.apiUrl}finance_manager/list_documents_po`, {
      headers: this.headers,
      params: new HttpParams()
        .set('fm_request_po_id', serviceTypeId?.toString())
    });
  }

  getPresignedPutURL(filename: string, id: number, folder?: string) {
    this.setHeaders();
    let params: any = {
			'filename': filename,
      'vendor_id': id,
    };
    if (folder) params.folder = folder;
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

  updateVendorDocument(formData: any){
    this.setHeaders();
    return this.http.post(`${environment.apiUrl}finance_manager/add_document_provider`, {...formData}, { headers: this.headers })
    .pipe(map( response => response))
  }

  updateDocument(formData: any){
    this.setHeaders();
    return this.http.post(`${environment.apiUrl}finance_manager/save_documents_po`, {...formData}, { headers: this.headers })
    .pipe(map( response => response))
  }

  deleteDocument(documentId: any){
    this.setHeaders();

    let params = new HttpParams().set('document_id', documentId);

    return this.http.delete(`${environment.apiUrl}finance_manager/delete_document_vendor`, {
      params: params,
      headers: this.headers
    })
    .pipe(map( response => response))
  }


  sendDocumentsForm() {
    this.setHeaders();
    return this.http.get(`${environment.apiUrl}finance_manager/send_documents_vinculation`, {
      headers: this.headers,
    });
  }

  constructor(private http: HttpClient, private auth: AuthService) {
  }
}
