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
  public minDate = new Date(1940, 1, 1);
  public maxDate = new Date(2004, 1, 1);
  public companyJobs: CompanyJob[] = [
    {value: 'Programator', viewValue: 'Programator'},
    {value: 'Contabil', viewValue: 'Contabil'},
    {value: 'Manager operations', viewValue: 'Manager operations'},
    {value: 'Consultant', viewValue: 'Consultant'},
    {value: 'Call center', viewValue: 'Call center'},
    {value: 'Software engineer', viewValue: 'Software engineer'}
  ];
  public selectedJob: string;

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
      salary: [],
      jobToApplyFor:[]
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
    formValue['jobToApplyFor'] = this.selectedJob;

    if (true) {
      const image = this.userImage.nativeElement;
      if (image.files && image.files[0]) {
        this.userImageFile = image.files[0];
      }
      const formData = new FormData();
      let photoExists = 0;
      if (formValue['photo'] !== "") {
        photoExists = 1;
      }
      if (photoExists) {
        formData.append('photo', this.userImageFile, this.userImageFile.name);
        const emailUsername = this.productForm.get('email').value.split('@')[0];
        formData.append('username', emailUsername);
      }

      this.http.post<any>('http://localhost:5000/api/v1/recruits', formValue).subscribe(data => {
        this.postId = data;
        if (photoExists) {
          this.http.put<any>('http://localhost:5000/api/v1/recruits/' + this.postId, formData).subscribe(() => {
            console.log("done");
          });
        }
      });
    }


  }

  validateData(values) {
    const constoptions = { positionClass: 'toast-custom' };

    if (values['firstname'] === '') {
      this.toastr.error('Numele trebuie completat', 'Camp obligatoriu')
      return 0;
    }

    if (values['lastname'] === '') {
      this.toastr.error('Numele trebuie completat', 'Camp obligatoriu')
      return 0;
    }

    if (values['email'] === '' || values['email'] === null) {
      this.toastr.error('Emailul trebuie completat', 'Camp obligatoriu')
      return 0;
    }

    if (!this.validateEmail(values['email'])) {
      this.toastr.error('Emailul nu este valid', 'Emailul completat incorect')
      return 0;
    }

    if (values['phone'] === '' || values['phone'] === null) {
      this.toastr.error('Telefonul trebuie completat', 'Telefon completat incorect')
      return 0;
    }

    if (values['phone'].length !== 10) {
      this.toastr.error('Telefonul trebuie sa contina maximum 10 cifre', 'Telefon completat incorect')
      return 0;
    }

    if (values['salary'] !== "" && values['salary'] < 1000) {
      this.toastr.error('Salariul asteptat este recomandat sa fie peste 1000', 'Camp obligatoriu')
      return 0;
    }

    if (values['jobs'].length > 0) {
      for (const job of values['jobs']) {
        if (+job.fromJob < 1940) {
          this.toastr.error('DIn anul Loc de munca incorect', 'Camp incorect');
        }
        return 0;
      }
    }

    if (values['institutions'].length > 0) {
      for (const inst of values['institutions']) {
        if (+inst.from < 1940) {
          this.toastr.error('Din anul Loc de munca incorect', 'Camp incorect');
        }
        return 0;
      }
    }


    return 1;
  }

  validateEmail(email): boolean {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  uploadFile(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
    }

  }

  onSelectJob(value: any){
    this.selectedJob = value;
  }
}


export interface CompanyJob {
  value: string;
  viewValue: string;
}
