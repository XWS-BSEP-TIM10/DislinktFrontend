import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAdPageComponent } from './job-ad-page.component';

describe('JobAdPageComponent', () => {
  let component: JobAdPageComponent;
  let fixture: ComponentFixture<JobAdPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobAdPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAdPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
