import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavouriteButtonService {

  constructor(private http: HttpClient) { }

  public handleFavourite(value: boolean, recruitId: string): Observable<any> {
    if (value ===  true) {
      return this.http.put<any>('http://localhost:5000/api/v1/recruits/setfavourite/' + recruitId, recruitId);
    } else {
      return this.http.put<any>('http://localhost:5000/api/v1/recruits/removefavourite/' + recruitId, recruitId);
    }
  }
}
