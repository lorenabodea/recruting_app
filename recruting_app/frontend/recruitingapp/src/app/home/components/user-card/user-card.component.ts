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

  @Input() recruit: Recruit;

  constructor() { }

  ngOnInit(): void {
    console.log(this.recruit);
    this.lastJob = this.recruit.jobs.length > 0 ? this.recruit.jobs.pop().position : 'unemployed';
    this.imagepath = '../../../../assets/profile-images/'
     + this.recruit.email.split('@')[0] + '.png';
  }

}
