import { Recruit } from './../../retrieve-data-service.service';
import { Component, OnInit, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-recrut-details',
  templateUrl: './recrut-details.component.html',
  styleUrls: ['./recrut-details.component.scss']
})
export class RecrutDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public recruit: Recruit) { }

  public mailTo(): void {
    location.href = this.recruit.email;
  }

  ngOnInit(): void {
    console.log(this.recruit);
  }

}
