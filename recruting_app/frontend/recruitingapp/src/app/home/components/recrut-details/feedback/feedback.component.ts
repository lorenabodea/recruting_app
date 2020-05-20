import { Recruit } from './../../../retrieve-data-service.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  public feedbackForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public recruit: Recruit,
    private fb: FormBuilder,
    private http: HttpClient,
    private readonly dialogRef: MatDialogRef<FeedbackComponent>) {
    this.feedbackForm = this.fb.group({
      feedback: ''
    });
  }

  ngOnInit(): void {
  }

  public onSubmit(formValue): void {
    const feedback = {
      feedback: formValue.feedback,
      recruit_id: this.recruit.id,
      recruiter_id: JSON.parse(localStorage.getItem('currentUser'))['username']
    };

    this.http.post('http://localhost:5000/api/v1/feedback', feedback).subscribe(
      data => {console.log(data);
        this.dialogRef.close();}
    );
  }
}
