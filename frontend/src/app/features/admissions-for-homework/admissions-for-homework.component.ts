import { Component, inject, OnInit } from '@angular/core';
import { AdmissionService } from '../../core/service/admission.service';
import { Admission } from '../../core/model/entities/admission';
import { FileDownloadService } from '../../core/service/file-download.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Homework } from '../../core/model/entities/homework';
import { HomeworkService } from '../../core/service/homework.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admissions-for-homework',
  imports: [CommonModule, RouterModule],
  templateUrl: './admissions-for-homework.component.html',
  styleUrl: './admissions-for-homework.component.scss'
})
export class AdmissionsForHomeworkComponent implements OnInit {
  
  admissionService = inject(AdmissionService);
  fileDownloadService = inject(FileDownloadService);
  homeworkService = inject (HomeworkService);
  private route = inject(ActivatedRoute);
  admissions: Admission[] = [];
  homework: Homework | undefined;

  id: string = "";

  ngOnInit(): void {
     const id = this.route.snapshot.paramMap.get('id');
     this.id = id!;
     
     this.homeworkService.getHomeworkById(+id!).subscribe({
      next: (homework) => this.homework = homework
     })

     this.admissionService.getAdmissionByHomeworkId(+id!).subscribe({
      next: (admissions) => this.admissions = admissions
     })
  }
}
