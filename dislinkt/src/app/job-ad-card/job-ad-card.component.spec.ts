import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAdCardComponent } from './job-ad-card.component';

describe('JobAdCardComponent', () => {
  let component: JobAdCardComponent;
  let fixture: ComponentFixture<JobAdCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobAdCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAdCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
