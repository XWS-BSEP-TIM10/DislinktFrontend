import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingProfileCardComponent } from './pending-profile-card.component';

describe('PendingProfileCardComponent', () => {
  let component: PendingProfileCardComponent;
  let fixture: ComponentFixture<PendingProfileCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingProfileCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingProfileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
