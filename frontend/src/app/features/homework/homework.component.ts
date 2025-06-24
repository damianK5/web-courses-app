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
import { map } from 'rxjs';
import { FileListService } from '../../core/service/file-list.service';
import { User } from '../../core/model/entities/user';
import { Admission } from '../../core/model/entities/admission';

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
  private fileListService = inject(FileListService);

  homework: Homework | undefined;
  errorMessage: string = ""
  selectedFiles: File[] = [];
  fileNames: string[] = [];
  uploadSuccess: boolean | null = null;
  hasAdmission = false;
  user : User | undefined;
  addedFileNames: String[] = [];
  admissions = this.admissionService.getCurrentAdmissions();

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.user = this.userService.getUser()?? undefined;
    this.homeworkService.getHomeworkById(+id!).subscribe({
      next: homework =>{
        this.homework=homework;
        this.admissionService.getAdmissionByUserId(this.user!.id).subscribe({
          next: (admissions) =>{
            admissions.forEach(admission=>{
              if (admission.homework.id===homework.id){
                this.hasAdmission = true;
                this.fileListService.getAdmissionFilesList(homework.course.id!, this.user!.id, homework.id ).subscribe({
                  next: (list) => this.addedFileNames=list
                })
              }
            })
          }
        })
      }  
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
    if (!this.selectedFiles.length || !this.homework || this.user === null) return;
    if(this.fileNames.filter(value=>this.addedFileNames.includes(value)).length>0){
      this.errorMessage = "Dodano plik, który juz istnieje na serwerze, usuń plik, zmień jego nazwę a następnie dodaj go ponownie"
      console.error('Upload error:');
      this.uploadSuccess = false;
      return;
    }
    this.fileUploadService.uploadAdmission( this.selectedFiles,this.homework.course.id!,this.user!.id, this.homework.id).subscribe({
      next: success => {
        this.uploadSuccess=true;
        this.hasAdmission = true;
        const admissionDTO : AdmissionDTO = {
          admissionDate: Date.now(),
          filepath: "storage/"+ this.homework?.course.name+"/"+ this.user!.firstName+"_"+this.user!.lastName+"_"+this.user!.id+"/"+this.homework?.id!,
          courseId: this.homework?.course.id!,
          homeworkId: this.homework?.id!,
          userId: this.user!.id
        };
        if (this.addedFileNames.length==0)
          this.admissionService.addAdmission(admissionDTO).subscribe();
        this.fileListService.getAdmissionFilesList(this.homework!.course.id!, this.user!.id, this.homework!.id ).subscribe({
          next: (list) => this.addedFileNames=list
        })
        this.fileNames = [];
      },
      error: err => {
        this.errorMessage ="Błąd przy wysyłaniu plików do serwera";
        console.error('Upload error:', err);
        this.uploadSuccess = false;
      }
    });
  }

  removeFile(index: number) {
    if (this.selectedFiles[index]){
      this.selectedFiles.splice(index, 1);
      this.fileNames.splice(index, 1);
    }
  }
}
