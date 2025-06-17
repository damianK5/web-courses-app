import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { UserService } from '../../core/service/user.service';
import { AuthService } from '../../core/service/auth.service';
import { CoursesPanelComponent } from './components/courses-panel/courses-panel.component';
import { HomeworksPanelComponent } from './components/homeworks-panel/homeworks-panel.component';
import { CourseService } from '../../core/service/course.service';
import { HomeworkService } from '../../core/service/homework.service';
import { AdmissionService } from '../../core/service/admission.service';
import { Homework } from '../../core/model/entities/homework';
import { catchError, forkJoin, of, switchMap } from 'rxjs';
import { Admission } from '../../core/model/entities/admission';
import { Course } from '../../core/model/entities/course';

@Component({
  selector: 'app-main-page',
  imports: [CoursesPanelComponent, HomeworksPanelComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  authService = inject(AuthService);
  userService = inject(UserService);
  courseService = inject(CourseService);
  homeworkService = inject(HomeworkService);
  admissionService = inject(AdmissionService);

  email = signal('');
  roles: string[] = [];

  all_homeworks : Homework[] = [];

  ngOnInit(): void {
    const token = localStorage.getItem('loggedUser');
    if (token) {
      
      this.authService.getCurrentUserDetails().subscribe({
      next: (user) =>{
        this.courseService.getCoursesByUserId(user.id).subscribe({
        next: (courses) => {
          
          const homeworkRequests = courses.map(course => 
            this.homeworkService.getHomeworksByCourse(course.id)
          );
          
          forkJoin(homeworkRequests).subscribe({
            next: (allHomeworkArrays) => {
              this.all_homeworks = [...this.all_homeworks, ...allHomeworkArrays.flat()];
              
              this.admissionService.getAdmissionByUserId(user.id).subscribe();
              this.homeworkService.setHomeworks(this.all_homeworks);
            },
            error: (error) => {
              console.error("Failed to load homeworks", error);
            }
          });
        },
        error: error => {
          console.error("Failed", error);
        }
      });
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
}
