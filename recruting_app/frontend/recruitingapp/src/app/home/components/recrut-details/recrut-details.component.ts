import { FeedbackComponent } from './feedback/feedback.component';
import { Recruit } from './../../retrieve-data-service.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recrut-details',
  templateUrl: './recrut-details.component.html',
  styleUrls: ['./recrut-details.component.scss']
})
export class RecrutDetailsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public recruit: Recruit,
    private http: HttpClient,
    public dialog: MatDialog) { }

  public mailTo(): void {
    location.href = this.recruit.email;
  }

  public emailRecruit(): void {
    const user = {
      firstname: this.recruit.firstName,
      lastname: this.recruit.lastName,
      email: this.recruit.email
    };

    this.http.post('http://localhost:5000/sendmail', user).subscribe(
      data => {
        console.log('trimis cu succes');
      }
    );
  }

  addFeedback(): void {
      this.dialog.open(FeedbackComponent, {
        data: this.recruit
      });
  }

  ngOnInit(): void {
  }

}
