import { FeedbackComponent } from './feedback/feedback.component';
import { Recruit, RetrieveDataServiceService, Feedback } from './../../retrieve-data-service.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recrut-details',
  templateUrl: './recrut-details.component.html',
  styleUrls: ['./recrut-details.component.scss']
})
export class RecrutDetailsComponent implements OnInit {

  private feedbackSubject = new Subject<Feedback[]>();
  public feedbacks$!: Observable<Feedback[]>;
  public user;


  constructor(
    @Inject(MAT_DIALOG_DATA) public recruit: Recruit,
    private http: HttpClient,
    public dialog: MatDialog,
    public dataService: RetrieveDataServiceService,
    private toastr: ToastrService) {
  }

  public mailTo(): void {
    location.href = this.recruit.email;
  }

  public emailRecruit(): void {
    this.http.post('http://localhost:5000/sendmail', this.user).subscribe(
      () => {
        this.toastr.success('Mail trimis cu succes!')
      }
    );
  }

  public emailAccept() {
    this.http.post('http://localhost:5000/sendmailaccept', this.user).subscribe(
      () => {
        this.toastr.success('Mail trimis cu succes!')
      }
    );
  }

  public emailReject() {
    this.http.post('http://localhost:5000/sendmailreject', this.user).subscribe(
      () => {
        this.toastr.success('Mail trimis cu succes!')
      }
    );
  }

  addFeedback(): void {
    this.dialog.open(FeedbackComponent, {
      data: this.recruit
    });
  }

  ngOnInit(): void {
    this.dataService.feedbackSubject.next(this.recruit.feedback);
    this.feedbacks$ = this.dataService.feedbackSubject.asObservable();

    this.user = {
      firstname: this.recruit.firstName,
      lastname: this.recruit.lastName,
      email: this.recruit.email
    };
  }

}
