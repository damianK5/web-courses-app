import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeworkService } from '../../core/service/homework.service';
import { FileUploadService } from '../../core/service/file-upload.service';
import { Homework } from '../../core/model/entities/homework';
import { UserService } from '../../core/service/user.service';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdmissionDTO } from '../../core/model/entities/admissionDTO';
import { AdmissionService } from '../../core/service/admission.service';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.scss'],
  imports: [CommonModule,  MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule,],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' }
  ]
})

export class HomeworkComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private homeworkService = inject(HomeworkService);
  private fileUploadService = inject(FileUploadService);
  private userService = inject(UserService);
  private admissionService = inject(AdmissionService);

  homework: Homework | undefined;
  selectedFiles: File[] = [];
  fileNames: string[] = [];
  uploadSuccess: boolean | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.homeworkService.getHomeworkById(+id!).subscribe({
      next: homework => this.homework = homework
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
      this.selectedFiles = Array.from(files);
      this.fileNames = this.selectedFiles.map(file => file.name);
    }
  }

  onUpload(): void {
    const user = this.userService.getUser();
    if (!this.selectedFiles.length || !this.homework || user === null) return;

    this.fileUploadService.uploadAdmission( this.selectedFiles,this.homework.course.id,user.id, this.homework.id).subscribe({
      next: success => {
        const admissionDTO : AdmissionDTO = {
          admissionDate: Date.now(),
          filepath: "storage/"+ this.homework?.course.name+"/"+ user.firstName+"_"+user.lastName+"_"+user.id+"/"+this.homework?.id!,
          courseId: this.homework?.course.id!,
          homeworkId: this.homework?.id!,
          userId: user.id
        };
        this.admissionService.addAdmission(admissionDTO).subscribe();
      },
      error: err => {
        console.error('Upload error:', err);
        this.uploadSuccess = false;
      }
    });
  }
}
