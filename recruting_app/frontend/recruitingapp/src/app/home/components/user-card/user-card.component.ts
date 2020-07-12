import { Recruit } from './../../retrieve-data-service.service';
import { Component, OnInit, Input } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  public lastJob: string = '';
  public imagepath: string = '../../../../assets/profile.png';
  public jobToApplyFor: string;

  @Input() recruit: Recruit;

  constructor() { }

  ngOnInit(): void {
    // this.lastJob = this.recruit.jobs.length > 0 ? this.recruit.jobs[this.recruit.jobs.length - 1].position : 'unemployed';
    this.jobToApplyFor = this.recruit.jobToApplyFor;
    if (this.recruit.jobs.length > 0) {
      for (const job of this.recruit.jobs) {
        if (!job.toYear) {
          job.toYear = '2020';
        }
      }
    }
    if (this.recruit.schoolInstitutions.length > 0) {
      for (const school of this.recruit.schoolInstitutions) {
        if (!school.toYear) {
          school.toYear = '2020';
        }
      }
    }
    // console.log(this.recruit);
    this.imagepath = '../../../../assets/profile-images/'
      + this.recruit.email.split('@')[0] + '.png';
  }

}
