import { TestBed } from '@angular/core/testing';

import { RecruitService } from './recruit.service';

describe('RecruitService', () => {
  let service: RecruitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecruitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
