import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionsForHomeworkComponent } from './admissions-for-homework.component';

describe('AdmissionsForHomeworkComponent', () => {
  let component: AdmissionsForHomeworkComponent;
  let fixture: ComponentFixture<AdmissionsForHomeworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmissionsForHomeworkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmissionsForHomeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
