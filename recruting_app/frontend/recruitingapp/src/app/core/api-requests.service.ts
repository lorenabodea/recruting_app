import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestsService {

  baseURL = "http://localhost:5000/api/v1/";

  constructor(private http: HttpClient) { }

  public delete(path: string): Observable<unknown> {
    return this.http.delete(this.baseURL + path);
  }
}
