import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recruit } from 'src/app/home/retrieve-data-service.service';
import { FavouriteButtonService } from './favourite-button.service';

@Component({
  selector: 'app-favourite-button',
  templateUrl: './favourite-button.component.html',
  styleUrls: ['./favourite-button.component.scss']
})
export class FavouriteButtonComponent implements OnInit {

  @Input() recruit: Recruit;
  @Input() disabled: boolean;
  @Output() selectedChange = new EventEmitter<number>();

  constructor(private readonly favouriteButtonService: FavouriteButtonService) { }

  ngOnInit() {
  }

  public toggleSelected() {
    this.recruit.favourite = 1 - this.recruit.favourite;
    this.selectedChange.emit(this.recruit.favourite);
    this.favouriteButtonService.handleFavourite(this.recruit.favourite, this.recruit.id);
  }

}
