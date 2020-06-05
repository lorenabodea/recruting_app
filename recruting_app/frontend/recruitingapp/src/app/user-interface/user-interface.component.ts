import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.scss']
})
export class UserInterfaceComponent implements OnInit {
  public productForm: FormGroup;
  postId: any;
  preview: string;
  @ViewChild('userImage') userImage;
  userImageFile: File;

  constructor(private fb: FormBuilder, private http: HttpClient,
    private toastr: ToastrService) {
    this.productForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: [],
      email: [],
      phone: [],
      birthday: [],
      photo: [''],
      institutions: this.fb.array([this.fb.group({ institution: '', from: '', to: '' })]),
      jobs: this.fb.array([this.fb.group({ job: '', fromJob: '', toJob: '' })]),
      certificates: this.fb.array([this.fb.group({ certificate: '' })]),
      languages: this.fb.array([this.fb.group({ language: '' })]),
      salary: []
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

    if (this.validateData(formValue)) {
      const image = this.userImage.nativeElement;
      if (image.files && image.files[0]) {
        this.userImageFile = image.files[0];
      }
      const formData = new FormData();
      formData.append('photo', this.userImageFile, this.userImageFile.name);
      const emailUsername = this.productForm.get('email').value.split('@')[0];
      formData.append('username', emailUsername);

      // this.http.put<any>('http://localhost:5000/api/v1/recruits/' + 93, formData).subscribe(() => {
      //   console.log("done");
      // });

      this.http.post<any>('http://localhost:5000/api/v1/recruits', formValue).subscribe(data => {
        this.postId = data;
        this.http.put<any>('http://localhost:5000/api/v1/recruits/' + this.postId, formData).subscribe(() => {
          console.log("done");
        });
      });
    }


  }

  validateData(values) {
    const constoptions = { positionClass:'toast-custom' };

    if (values['firstname'] === '') {
      this.toastr.error('Numele trebuie completat', 'Camp obligatoriu')
      return 0;
    }

    return 1;
  }

  uploadFile(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log( this.productForm.get('photo'))
      // this.productForm.get('photo');
      //this.productForm.get('photo').setValue(file);
    }


  }
}
