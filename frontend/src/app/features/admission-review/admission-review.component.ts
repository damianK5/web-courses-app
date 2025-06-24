import { Component, inject, OnInit } from '@angular/core';
import { AdmissionService } from '../../core/service/admission.service';
import { Admission } from '../../core/model/entities/admission';
import { ActivatedRoute, Router } from '@angular/router';
import { FileDownloadService } from '../../core/service/file-download.service';
import { UserService } from '../../core/service/user.service';
import { FileListService } from '../../core/service/file-list.service';
import { Homework } from '../../core/model/entities/homework';
import { HomeworkService } from '../../core/service/homework.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdmissionDTO } from '../../core/model/entities/admissionDTO';

@Component({
  selector: 'app-admission-review',
  imports: [FormsModule, CommonModule],
  templateUrl: './admission-review.component.html',
  styleUrl: './admission-review.component.scss'
})
export class AdmissionReviewComponent implements OnInit {
  
  private route = inject(ActivatedRoute);
  admissionService = inject(AdmissionService);
  fileDownloadService = inject(FileDownloadService);
  userService = inject(UserService);
  fileListService = inject(FileListService);
  homeworkService = inject(HomeworkService);
  router = inject(Router);

  addedFileNames: string[] = [];
  teacherComment: string = '';
  grade: number | null = null;
  admission : Admission | undefined;

  id: string = "";

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id!;
    this.admissionService.getAdmissionById(+id!).subscribe({
      next: (admission) => {
        this.admission = admission;
        if (admission.grade) this.grade = admission.grade;
        if(admission.teacherComment) this.teacherComment = admission.teacherComment 
        this.fileListService.getAdmissionFilesList(this.admission.course.id!, this.admission.user.id,this.admission.homework.id).subscribe({
          next: (nameList) => {
            console.log(nameList);
            this.addedFileNames = nameList
          }
        })
      }
    })
  }

  downloadFile(fileName: string): void {
    let filename2 = fileName + "/" + fileName;
    this.fileDownloadService.downloadAdmission(
      this.admission!.user.id!,
      this.admission!.course.id!,
      this.admission!.homework.id,
      filename2
    ).subscribe({
      next: (blob) => {
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(downloadUrl);
      },
      error: (err) => {
        console.error('Download failed', err);
      }
    });
  }

  onSubmit(): void {
    const admissionDTO : AdmissionDTO = {
        id:+this.id,
        admissionDate: this.admission?.admissionDate!,
        filepath: this.admission?.filepath,
        courseId: this.admission?.course.id!,
        homeworkId: this.admission?.homework.id!,
        userId: this.admission?.user.id!,
        teacherComment: this.teacherComment,
        grade:this.grade
      };
      this.admissionService.updateAdmission(admissionDTO).subscribe({
        next: () => {
          this.router.navigate(['/homework', this.admission!.homework.id, 'see-admissions']);
        },
        error: (err) => {
          console.error('Failed to update admission:', err);
        }
      });
  }
  validateGrade() {
  const max = this.admission?.homework?.maxGrade || 0;
  if (this.grade! > max) {
    this.grade = max;
  }
  if (this.grade! < 0) {
    this.grade = 0;
  }
}
}
