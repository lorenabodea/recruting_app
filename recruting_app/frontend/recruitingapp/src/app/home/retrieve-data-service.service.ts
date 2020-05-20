import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RetrieveDataServiceService {

  constructor(private http: HttpClient) { }


  recruits$: Observable<Recruit[]> = this.http.get<any>('http://localhost:5000/api/v1/recruits/').pipe(
    map((recruits) => {
      return recruits.map(recruit => ({
        id: recruit['id'],
        firstName: recruit['first_name'],
        lastName: recruit['last_name'],
        email: recruit['email'],
        birthday: recruit['birthday'],
        phone: recruit['phone'],
        photo: recruit['photo'],
        favourite: recruit['favourite'],
        salary: recruit['salary_expectation']
      }) as Recruit);
    })
  );

  jobs$ = this.http.get<Job[]>('http://localhost:5000/api/v1/jobs/').pipe(
    map((jobs) => {
      return jobs.map(job => ({
        userId: job['user_id'],
        position: job['position'],
        fromYear: job['from_year'],
        toYear: job['to_year']
      }) as Job);
    })
  );

  certificates$ = this.http.get<Certificate[]>('http://localhost:5000/api/v1/certificates/').pipe(
    map((response) => {
      return response.map(item => ({
        userId: item['user_id'],
        certificate: item['certificate'],
      }) as Certificate);
    })
  );


  languages$ = this.http.get<Language[]>('http://localhost:5000/api/v1/languages/').pipe(
    map((response) => {
      return response.map(item => ({
        userId: item['user_id'],
        language: item['language'],
      }) as Language);
    })
  );


  schools$ = this.http.get<SchoolInstitution[]>('http://localhost:5000/api/v1/school_institutions/').pipe(
    map((response) => {
      return response.map(item => ({
        userId: item['user_id'],
        name: item['name'],
        fromYear: item['from_year'],
        toYear: item['to_year']
      }) as SchoolInstitution);
    })
  );

}

export interface Recruit {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthday: Date;
  photo: string;
  favourite: number;
  certificates?: Certificate[];
  jobs?: Job[];
  languages?: Language[];
  schoolInstitutions?: SchoolInstitution[];
  salary: number;
  experience?: number;
}

export interface User {
  username: string;
  firstname: string;
  lastname: string;
  role: Role;
  token: string;
}

export enum Role {
  User = 'User',
  Admin = 'Admin'
}

export interface Certificate {
  certificate: string;
  userId: number;
}

export interface Job {
  userId: number;
  position: string;
  fromYear: string;
  toYear: string;
}

export interface Language {
  userId: number;
  language: string;
}

export interface SchoolInstitution {
  userId: number;
  name: string;
  fromYear: string;
  toYear: string;
}
