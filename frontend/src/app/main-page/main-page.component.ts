import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../model/entities/user';
import { catchError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { HeaderComponent } from '../component/header/header.component';
import { CoursesPanelComponent } from './components/courses-panel/courses-panel.component';
import { HomeworksPanelComponent } from './components/homeworks-panel/homeworks-panel.component';
import { ReportsPanelComponent } from './components/reports-panel/reports-panel.component';
import { CourseService } from '../service/course.service';
import { Course } from '../model/entities/course';

@Component({
  selector: 'app-main-page',
  imports: [HeaderComponent, CoursesPanelComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  authService = inject(AuthService);
  userService = inject(UserService);
  courseService = inject(CourseService);
  
  email =  signal("") ;
  roles: string[] = [];
  courses = signal<Course[]>([]);

  ngOnInit(): void {
    const token = localStorage.getItem('currentUser');
    if (token) {
      
      this.authService.getCurrentUserDetails().subscribe({
      next: (user) =>{
        console.log("im here");
        this.courseService.getCoursesByUserId(user.id).subscribe({
          next: (courses) =>{
            this.courses.set(courses);
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

  logout() {
    this.authService.logout().subscribe();
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
