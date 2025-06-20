import { Component, inject, OnInit } from '@angular/core';
import { FileUploadService } from '../../core/service/file-upload.service';
import { CourseService } from '../../core/service/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../core/model/entities/course';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AssetDTO } from '../../core/model/entities/assetDTO';
import { AssetService } from '../../core/service/asset.service';

@Component({
  selector: 'app-add-asset',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-asset.component.html',
  styleUrl: './add-asset.component.scss'
})
export class AddAssetComponent implements OnInit{

  courseService = inject(CourseService);
  fileUploadService = inject(FileUploadService);
  private route = inject(ActivatedRoute);
  assetService = inject(AssetService);
  router = inject(Router);
  course: Course | undefined;
  selectedFiles: File[] = [];
  fileNames: string[] = [];
  comment: string = "";
  name: string = "";
  relevant_date:number = 0;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('courseId');
    this.courseService.getCoursesById(+id!).subscribe({
      next: (course) => {this.course=course;}
    })
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
      this.selectedFiles = Array.from(files);
      this.fileNames = this.selectedFiles.map(file => file.name);
    }
  }

  onRelevantDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const dateString = input.value;
    this.relevant_date = new Date(dateString).getTime();
  }

  onSubmit() {
    if (this.selectedFiles.length){
      this.fileUploadService.uploadAsset(this.selectedFiles,this.course?.id!, this.name).subscribe();
    }
    const newAsset: AssetDTO = {
      course_id:this.course?.id!,
      name:this.name,
      relevant_date: this.relevant_date,
      comment:this.comment.length>0 ? this.comment : "brak komentarza",
      filepath: this.selectedFiles ? "storage/" + this.course?.name + "assets/"+this.name : ""
    }
    this.assetService.addAsset(newAsset).subscribe({
      next: (val) => this.router.navigate(['/course', this.course?.id])

    });

  }
}
