import { TestBed } from '@angular/core/testing';

import { RetrieveDataServiceService } from './retrieve-data-service.service';

describe('RetrieveDataServiceService', () => {
  let service: RetrieveDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetrieveDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
