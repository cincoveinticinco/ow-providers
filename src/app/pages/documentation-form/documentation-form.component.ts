import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { LateralMenuComponent } from '../../components/lateral-menu/lateral-menu.component';
import { TIPOPERSONA } from '../../shared/Interfaces/typo_persona';
import { VendorService } from '../../services/vendor.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileboxComponent } from '../../components/filebox/filebox.component';
import { CommonModule } from '@angular/common';
import { GlobalService } from '../../services/global.service';
import { Subscription, catchError, map, of, switchMap } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeView } from '../../shared/Interfaces/status_form';

@Component({
  selector: 'app-documentation-form',
  standalone: true,
  imports: [HeaderComponent, LateralMenuComponent, ReactiveFormsModule, FileboxComponent, CommonModule],
  templateUrl: './documentation-form.component.html',
  styleUrl: './documentation-form.component.scss'
})
export class DocumentationFormComponent implements OnInit {

  readonly TIPOPERSONA = TIPOPERSONA;

  loading: boolean = true;
  documents: any[] = [];
  documentForm: FormGroup;
  linkDocument: any = null;
  filesDynamic: {[key: number]: string} = {};
  subs: Subscription[] = [];
  errorDocuments: boolean = false;
  serviceTypeId: number = 0;

  constructor(
    private _cS: VendorService,
    private fb: FormBuilder,
    private _gS: GlobalService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.documentForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.serviceTypeId = Number(params?.serviceTypeId);
      this._cS.setVendorId(Number(params?.id));
      this.loadData();
    });

    //subscription
    this.subs.push(this.documentForm.valueChanges.subscribe(valor => {
      Object.keys(this.documentForm.controls).forEach((controlName: any) => {
        const control = this.documentForm.get(controlName);
        if (control && control.dirty) {
          const foundKey = Object.keys(this.filesDynamic).find((key: any) => this.filesDynamic[key] === controlName);
          if (foundKey) {
            const fileData = {
              formControlName: controlName,
              value: control?.value?.file,
              vendor_id: this._cS.getVendorId(),
            };
            this.submitFile(fileData);
            control.markAsPristine();
          }
        }
      });

      var data = {
        typeForm: TypeView.Docs,
        form: valor
      };

      this._cS.setGeneralForm(data);
    }));
  }

  loadData() {
    this.loading = true;
    this.subs.push(this._cS.getDocumentsData(this.serviceTypeId).subscribe({
      next: (data: any) => {
        this.documents = data?.data || [];
        this.documents.map((doc: any) => {
          doc.link = doc?.f_vendor_document?.link || '';
          doc.document_id = doc?.f_vendor_document?.id || null;
          doc.id = doc.f_vendor_document_type_id;
          doc.allowed_extensions = doc?.allowed_extensions ? doc.allowed_extensions.split(',') : [];
          console.log(doc);
        });

        this.setFormData();
        this._cS.setDocumentsList(this.documents);
        this.loading = false;
      }
    }));
  }

  setFormData() {
    this.documents.forEach((dc: any) => {
      this.documentForm.addControl(`document_${dc.id}`, new FormControl(''));
      this.documentForm.get(`document_${dc.id}`)?.setValue(this.setDynamicFiles(dc));
      if (dc.required) {
        this.documentForm.get(`document_${dc.id}`)?.setValidators([Validators.required]);
      }

      dc['class'] = '';
      if (dc?.document_type?.length > 120 ) dc['class'] = 'large-txt';
    });
    this.documents.forEach((dc: any) => {
      this.filesDynamic[dc.id] = `document_${dc.id}`;
    })
  }

  onSubmit() {
    if (!this.documentForm.invalid) {
      var params = { third_form: true }
      this.subs.push(this._cS.sendDocumentsForm().subscribe({
        next: (data: any) => {
          if (data?.error) {
            this.errorDocuments = true;
            return;
          }
          this.loading = false;
          this.router.navigate(['thanks-docs', this._cS.getVendorId()]);
        }
      }));
    }
    else {
      Object.values(this.documentForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  closeErrorDocuments() {
    window.location.reload();
  }

  submitFile(ev: any) {
    this.loading = true;
    const { value, formControlName } = ev;
    const fileIdDocument = Object.keys(this.filesDynamic).find(
      (key) =>
      this.filesDynamic[key as unknown as keyof typeof this.filesDynamic] == formControlName
    );
    const document = this._gS.getDocumentLink(fileIdDocument);
    if (!value) {
      this._cS.deleteDocument(document?.document_id)
      .subscribe((data) => this.loading = false);
    }
    else {
      const nameFile = this._gS.normalizeString(value.name);
      this._cS.getPresignedPutURL(nameFile, this.serviceTypeId, 'poservices').pipe(
        catchError((error) =>
          of({ id: fileIdDocument, file: value, key: '', url: '' })
        ),
        map((putUrl: any) => ({
          ...putUrl,
          id: fileIdDocument,
          file: value,
        })),
        switchMap((uploadFile: any) => {
          if (!uploadFile.url) {
            return of({ blobFile: null, uploadFile });
          }
          return new Promise(resolve => {
            uploadFile.file.arrayBuffer().then((blobFile: File) => resolve({ blobFile, uploadFile }));
          });
        }),
        switchMap((blobUpdateFile: any) => {
          const { blobFile, uploadFile } = blobUpdateFile;
          if (!blobFile) {
            return of(uploadFile);
          }
          return this._cS.uploadFileUrlPresigned(<File>blobFile, uploadFile.url, uploadFile.file.type)
            .pipe(
              catchError((_) => of({ ...value, url: '' })),
              map((value) => value.type == HttpEventType.Response ? uploadFile : null)
            );
        }),
        switchMap(
          (uploadFile: any) => {
            if (!uploadFile) return of(false);
            let data: any = {
              link: uploadFile.url ? `poservices/${this.serviceTypeId}/${nameFile}` : 'text.png',
              f_vendor_document_type_id: fileIdDocument,
            }

            console.log(document);

            if (document?.f_person_type_id) data.f_person_type_id = document.f_person_type_id;
            if (document?.pr_service_type_id) data.pr_service_type_id = document.pr_service_type_id;

            return this._cS.updateDocument(data);
          }
        ),
        map((response: any) => {
          this.linkDocument = response;
        })
      )
      .subscribe((value) => {
        setTimeout(() => { this.loading = false }, 0)
      });
    }
  }

  setDynamicFiles(doc: any) {
    const file = doc.link ? { name: doc.link, url: doc.link} : null;
    return file;
  }

  get fDocuments() {
    return this.documentForm.controls;
  }

  ngOnDestroy() {
    this.subs.map(s => s.unsubscribe());
  }
}
