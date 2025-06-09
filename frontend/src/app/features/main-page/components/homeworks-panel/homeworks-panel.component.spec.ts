import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeworksPanelComponent } from './homeworks-panel.component';

describe('HomeworksPanelComponent', () => {
  let component: HomeworksPanelComponent;
  let fixture: ComponentFixture<HomeworksPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeworksPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeworksPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
