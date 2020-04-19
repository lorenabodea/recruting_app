import { ApiRequestsService } from './../../../core/api-requests.service';
import { Recruit } from './../../retrieve-data-service.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recrut-details',
  templateUrl: './recrut-details.component.html',
  styleUrls: ['./recrut-details.component.scss']
})
export class RecrutDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public recruit: Recruit,
    private readonly apiRequestsService: ApiRequestsService,
    private http: HttpClient) { }

  public mailTo(): void {
    location.href = this.recruit.email;
  }

  public removeRecruit(): void {
    // this.apiRequestsService.delete('recruits/' + this.recruit.id).subscribe(
    //   (res) => console.log(res)
    // );
    const user = {
      firstname: this.recruit.firstName,
      lastname: this.recruit.lastName,
      email: this.recruit.email
    };

    this.http.post("http://localhost:5000/sendmail", user).subscribe(
      data => {
        let res: any = data;
        console.log("trimis cu succes");
      }
    );
  }

  ngOnInit(): void {
    console.log(this.recruit);
  }

}
