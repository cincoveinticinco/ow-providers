import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { LateralMenuComponent } from '../../components/lateral-menu/lateral-menu.component';
import { TIPOCREW } from '../../shared/Interfaces/typo_crew';
import { TIPOPERSONA } from '../../shared/Interfaces/typo_persona';
import { CrewService } from '../../services/crew.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileboxComponent } from '../../components/filebox/filebox.component';
import { CommonModule } from '@angular/common';
import { STATUSFORM } from '../../shared/Interfaces/status_form';
import { GlobalService } from '../../services/global.service';
import { Subscription, catchError, map, of, switchMap } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documentation-form',
  standalone: true,
  imports: [HeaderComponent, LateralMenuComponent, ReactiveFormsModule, FileboxComponent, CommonModule],
  templateUrl: './documentation-form.component.html',
  styleUrl: './documentation-form.component.scss'
})
export class DocumentationFormComponent implements OnInit {

  @Input() typeCrew: TIPOCREW | null = null;
  @Input() crew: any = null;

  readonly TIPOCREW = TIPOCREW;
  readonly TIPOPERSONA = TIPOPERSONA;
  readonly STATUSFORM = STATUSFORM;

  loading: boolean = false;
  documents: any[] = [];
  documentForm: FormGroup;
  linkDocument: any = null;
  filesDynamic: {[key: number]: string} = {};
  subs: Subscription[] = [];
  readonly onlyPDF = [306, 307, 308, 311, 312, 314, 315, 318, 319, 320, 321, 322];
  errorDocuments: boolean = false;

  constructor(private _cS: CrewService, private fb: FormBuilder, private _gS: GlobalService, private router: Router) {
    this.documentForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.loadData();
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
              crew_id: this._cS.getCrewId(),
            };
            this.submitFile(fileData);
            control.markAsPristine();
          }
        }
      });
      var data = {
        typeForm: STATUSFORM.SolicitudDocumentacion,
        typePerson: this.typeCrew,
        form: valor
      };
      this._cS.setGeneralForm(data);
    }));
  }

  loadData() {
    this.loading = true;
    this.subs.push(this._cS.getDocumentsData().subscribe({
      next: ((data: any) => {
        this.documents = data.f_vendor_document_types || [];
        this.setFormData();
        this.loading = false;
      })
    }));
  }

  setFormData() {
    this.documents.forEach((dc: any) => {
      this.documentForm.addControl(`document_${dc.id}`, new FormControl('', [Validators.required]));
      this.documentForm.get(`document_${dc.id}`)?.setValue(this.setDynamicFiles(dc));
      this.setNonRequiredDocuments(dc);
      dc['class'] = '';
      if (dc.document_type.length > 120 ) dc['class'] = 'large-txt';
    });
    this.documents.forEach((dc: any) => {
      this.filesDynamic[dc.id] = `document_${dc.id}`;
    })
  }

  setNonRequiredDocuments(doc: any) {
    if (this.typeCrew == TIPOCREW.Vendor) {
      if (this.crew?.f_person_type_id == TIPOPERSONA.Natural) {
        if ([163].includes(doc.id)) this.documentForm.get(`document_${doc.id}`)?.clearValidators();
      }
      if ([44].includes(doc.id)) this.documentForm.get(`document_${doc.id}`)?.clearValidators();
    }

    if ([156].includes(doc.id)) this.documentForm.get(`document_${doc.id}`)?.clearValidators();

    this.documentForm.get(`document_${doc.id}`)?.updateValueAndValidity();
  }

  onSubmit() {
    if (!this.documentForm.invalid) {
      var params = { third_form: true }
      this.subs.push(this._cS.changeStatus(params).subscribe({
        next: (data) => {
          if (data?.error) {
            this.errorDocuments = true;
            return;
          }
          this.loading = false;
          this.router.navigate(['thanks-docs', this._cS.getCrewId()]);
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
    const documentId = this._gS.getDocumentLink(fileIdDocument)?.document_id;
    if (!value) {
      this._cS.deleteCrewDocument(documentId)
      .subscribe((data) => this.loading = false);
    }
    else {
      const nameFile = this._gS.normalizeString(value.name);
      this._cS.getPresignedPutURL(nameFile, ev.crew_id).pipe(
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
            return this._cS.updateCrewDocument({
              crew_document_type_id: Number(uploadFile.id),
              link: uploadFile.url
              ? `${ev.crew_id}/${nameFile}`
              : '',
            });
          }
        ),
        map((response: any) => {
          this.linkDocument = response;
        })
      )
      .subscribe((value) => {
        setTimeout(() => { this.loading = false }, 3000)
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
