import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RetrieveDataServiceService {

  constructor(private http: HttpClient) { }

  public getRecruits(): Observable<any> {
    return  this.http.get<any>('http://localhost:5000/api/v1/recruits').pipe();
  }

  public getCertificates(userId: string): Observable<any> {
    return  this.http.get<any> ('http://localhost:5000/api/v1/certificates/' + userId).pipe();
  }

  public getJobs(userId: string): Observable<any> {
    return  this.http.get<any> ('http://localhost:5000/api/v1/jobs/' + userId).pipe();
  }

  public getLanguages(userId: string): Observable<any> {
    return  this.http.get<any> ('http://localhost:5000/api/v1/languages/' + userId).pipe();
  }

  public getSchoolInstitutions(userId: string): Observable<any> {
    return  this.http.get<any> ('http://localhost:5000/api/v1/school_institutions/' + userId).pipe();
  }

}

export interface Recruit {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthday: Date;
  photo: string;
  favourite: boolean;
  certificates?: Certificate[];
  jobs?: Job[];
  languages?: Language[];
  schoolInstitutions?: SchoolInstitution[];
}

export interface Certificate {
  certificate: string;
}

export interface Job {
  position: string;
  fromYear: string;
  toYear: string;
}

export interface Language {
  language: string;
}

export interface SchoolInstitution {
  name: string;
  fromYear: string;
  toYear: string;
}
