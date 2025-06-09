import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { UserService } from '../../core/service/user.service';
import { User } from '../../core/model/entities/user';
import { catchError } from 'rxjs';
import { AuthService } from '../../core/service/auth.service';
import { HeaderComponent } from '../../layout/header/header.component';
import { CoursesPanelComponent } from './components/courses-panel/courses-panel.component';
import { HomeworksPanelComponent } from './components/homeworks-panel/homeworks-panel.component';
import { ReportsPanelComponent } from './components/reports-panel/reports-panel.component';
import { CourseService } from '../../core/service/course.service';
import { Course } from '../../core/model/entities/course';
import { Homework } from '../../core/model/entities/homework';
import { HomeworkService } from '../../core/service/homework.service';
import { AdmissionService } from '../../core/service/admission.service';

@Component({
  selector: 'app-main-page',
  imports: [HeaderComponent, CoursesPanelComponent, HomeworksPanelComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  authService = inject(AuthService);
  userService = inject(UserService);
  courseService = inject(CourseService);
  homeworkService = inject(HomeworkService);
  admissionService = inject(AdmissionService);
  
  email =  signal("") ;
  roles: string[] = [];
  homeworks = signal<Homework[]>([]);

  ngOnInit(): void {
    const token = localStorage.getItem('currentUser');
    if (token) {
      
      this.authService.getCurrentUserDetails().subscribe({
      next: (user) =>{
        this.courseService.getCoursesByUserId(user.id).subscribe({
          next: (courses) =>{
            for (const course of courses ){
              this.homeworkService.getHomeworksByCourse(course.id).subscribe();
              this.admissionService.getAdmissionByUserId(user.id).subscribe();
            }
          },
          error: error => {
            console.error("Failed", error);
          }
        })
      },
      error: (err) => {
          console.error('Could not load user', err)
        }
      })
    
    const decoded = this.authService.decodeToken(token);
    this.email.set( decoded.sub);
    this.roles = decoded.roles;
    }
  }

  // this was for testing
  // userService = inject(UserService);
  // users = signal<Array<User>>([]);

  // ngOnInit(): void {
  //   this.userService.getUsers()
  //     .pipe(
  //       catchError(err => {
  //         console.log(err);
  //         throw err;
  //       })
  //     ).subscribe((users) => {
  //       this.users.set(users);
  //     });
  // }
}
