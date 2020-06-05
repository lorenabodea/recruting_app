import { Recruit, RetrieveDataServiceService, Feedback } from './../../../retrieve-data-service.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {

  public feedbackForm: FormGroup;
  private feedbackCache: Feedback[];


  constructor(
    @Inject(MAT_DIALOG_DATA) public recruit: Recruit,
    private fb: FormBuilder,
    private http: HttpClient,
    private readonly dataService: RetrieveDataServiceService,
    private readonly dialogRef: MatDialogRef<FeedbackComponent>) {
    this.feedbackForm = this.fb.group({
      feedback: ''
    });
  }


  public onSubmit(formValue): void {
    const feedback = {
      feedback: formValue.feedback,
      recruit_id: this.recruit.id,
      recruiter_id: JSON.parse(localStorage.getItem('currentUser'))['username']
    };

    this.http.post('http://localhost:5000/api/v1/feedback', feedback).subscribe(
      data => {
        console.log(data);
        this.dataService.feedbackSubject.subscribe(
          data => {
            this.feedbackCache = [...data, {
              feedback: feedback.feedback,
              userId: feedback.recruit_id,
            } as Feedback]

            console.log(this.feedbackCache);
          }
        )

        // console.log(this.feedbackCache);

        this.dataService.feedbackSubject.next(this.feedbackCache)

        // .pipe(
        //   map(response => {
        //     const feedbackObj = {
        //       feedback: feedback.feedback,
        //       userId: feedback.recruit_id,
        //     } as Feedback;
        //     // const feedbackArray = [...response, feedbackObj];
        //     const feedbackArray = response;
        //     return feedbackArray;
        //   })
        // )
        this.dialogRef.close();
      }
    );

  }
}
