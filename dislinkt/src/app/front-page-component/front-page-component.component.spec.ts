import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontPageComponentComponent } from './front-page-component.component';

describe('FrontPageComponentComponent', () => {
  let component: FrontPageComponentComponent;
  let fixture: ComponentFixture<FrontPageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontPageComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
