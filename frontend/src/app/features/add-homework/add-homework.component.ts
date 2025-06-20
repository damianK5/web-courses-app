import { Component, inject, OnInit } from '@angular/core';
import { HomeworkService } from '../../core/service/homework.service';
import { CourseService } from '../../core/service/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../core/model/entities/course';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeworkDTO } from '../../core/model/entities/homeworkDTO';
import { FileUploadService } from '../../core/service/file-upload.service';

@Component({
  selector: 'app-add-homework',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-homework.component.html',
  styleUrl: './add-homework.component.scss'
})
export class AddHomeworkComponent implements OnInit {

  homeworkService = inject(HomeworkService);
  courseService = inject(CourseService);
  fileUploadService = inject(FileUploadService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  deadline:number = 0;
  description: string = "";
  max_grade: number = 0;
  name: string = "";
  requirede_admission: boolean = true;
  course: Course | undefined;
  chosenFile: File |undefined;
  fileName: string = "";



  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('courseId');
    this.courseService.getCoursesById(+id!).subscribe({
      next: (course) => {this.course=course;}
    })
  }
  onSubmit() {
    
    if (this.chosenFile) this.fileUploadService.uploadHomework(this.chosenFile, this.course?.id!, this.name).subscribe();

    const newHomework: HomeworkDTO = {
      course_id: this.course?.id!,
      name: this.name,
      description: this.description,
      maxGrade: this.max_grade,
      deadline: this.deadline,
      filepath: this.chosenFile ? "storage/" + this.course?.name + "/homeworks/"+this.name : "Brak pliku"
    }
    this.homeworkService.addHomework(newHomework).subscribe({
      next: () => {
      this.router.navigate(['/course', this.course?.id]);
    },
    error: (err) => {
      console.error('Upload failed:', err);
    }
    });

  }
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement; 
    const file = input.files?.[0];
    if (file){
      this.chosenFile = file;
      this.fileName = this.chosenFile?.name;
    }
  }

  onDeadlineChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const dateString = input.value;
    this.deadline = new Date(dateString).getTime();
  }
}
