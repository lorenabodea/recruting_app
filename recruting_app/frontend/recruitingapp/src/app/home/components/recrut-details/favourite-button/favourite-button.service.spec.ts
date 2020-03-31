import { TestBed } from '@angular/core/testing';

import { FavouriteButtonService } from './favourite-button.service';

describe('FavouriteButtonService', () => {
  let service: FavouriteButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavouriteButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
