import { Component, inject, OnInit } from '@angular/core';
import { HomeworkService } from '../../../../core/service/homework.service';
import { CommonModule } from '@angular/common';
import { map, Observable, tap } from 'rxjs';
import { Homework } from '../../../../core/model/entities/homework';
import { AdmissionService } from '../../../../core/service/admission.service';
import { Admission } from '../../../../core/model/entities/admission';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-homeworks-panel',
  imports: [CommonModule, RouterModule],
  templateUrl: './homeworks-panel.component.html',
  styleUrl: './homeworks-panel.component.scss'
})
export class HomeworksPanelComponent implements OnInit{

  homeworksService = inject(HomeworkService);
  admissionService = inject(AdmissionService);

  homeworks$ = this.homeworksService.currentHomework$.pipe( map(homeworks => (homeworks ?? []).slice().sort((a, b) => a.id - b.id)));
  admissionHomeworkIds$ = this.admissionService.currentAdmission$.pipe( map(admission => new Set(admission?.map(a=>a.homework.id))));
  
  displayedHomeworks$!: Observable<Homework[]>;
  displayedAdmissions$!: Observable<Admission[]>;

  ngOnInit(): void {
    this.displayedHomeworks$ = this.homeworks$.pipe(
      map(homeworks => (homeworks ?? []).slice(0, 3))
    );   
  } 
}
