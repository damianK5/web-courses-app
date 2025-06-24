import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionReviewComponent } from './admission-review.component';

describe('AdmissionReviewComponent', () => {
  let component: AdmissionReviewComponent;
  let fixture: ComponentFixture<AdmissionReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmissionReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmissionReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
