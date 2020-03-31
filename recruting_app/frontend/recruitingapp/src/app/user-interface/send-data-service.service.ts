import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendDataServiceService {

  baseURL = "http://localhost:5000/api/v1/";

  constructor(private http: HttpClient) { }

  addUser(name: string, profileImage: File): Observable<any> {
    var formData: any = new FormData();
    formData.append("name", name);
    formData.append("photo", profileImage);

    return this.http.post<any>(`${this.baseURL}/create-user`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }
}
