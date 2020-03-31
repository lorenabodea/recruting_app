import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecrutDetailsComponent } from './recrut-details.component';

describe('RecrutDetailsComponent', () => {
  let component: RecrutDetailsComponent;
  let fixture: ComponentFixture<RecrutDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecrutDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecrutDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
