import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.scss']
})
export class UserInterfaceComponent implements OnInit {
  public productForm: FormGroup;
  postId: any;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.productForm = this.fb.group({
      firstname: [],
      lastname: [],
      email: [],
      phone: [],
      birthday: [],
      photo: [null],
      institutions: this.fb.array([this.fb.group({ institution: '', from: '', to: '' })]),
      jobs: this.fb.array([this.fb.group({ job: '', fromJob: '', toJob: '' })]),
      certificates: this.fb.array([this.fb.group({ certificate: '' })]),
      languages: this.fb.array([this.fb.group({ language: '' })])
    });

  }

  ngOnInit(): void {
  }

  get institutions() {
    return this.productForm.get('institutions') as FormArray;
  }

  addInstitution() {
    this.institutions.push(this.fb.group({ institution: '', from: '', to: '' }));
  }

  deleteInstitution(index) {
    this.institutions.removeAt(index);
  }

  get jobs() {
    return this.productForm.get('jobs') as FormArray;
  }

  addJob() {
    this.jobs.push(this.fb.group({ job: '', fromJob: '', toJob: '' }));
  }

  deleteJob(index) {
    this.jobs.removeAt(index);
  }

  get certificates() {
    return this.productForm.get('certificates') as FormArray;
  }

  addCertificate() {
    this.certificates.push(this.fb.group({ certificate: '' }));
  }

  deleteCertificate(index) {
    this.certificates.removeAt(index);
  }

  get languages() {
    return this.productForm.get('languages') as FormArray;
  }

  addLanguage() {
    this.languages.push(this.fb.group({ language: '' }));
  }

  deleteLanguage(index) {
    this.languages.removeAt(index);
  }

  public onSubmit(formValue): void {
    console.log(formValue);
    this.http.post<any>('http://localhost:5000/api/v1/recruits', formValue).subscribe(data => {
      this.postId = data.id;
      console.log(this.postId);
    });
  }

  uploadFile(event) {
    const fileList: FileList = event.target.files;
    const file = fileList[0];
    console.log(file);
    this.productForm.setValue({ photo: file });
  }
}
