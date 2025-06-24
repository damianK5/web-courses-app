import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../core/service/course.service';
import { UserService } from '../../core/service/user.service';
import { Course } from '../../core/model/entities/course';
import { User } from '../../core/model/entities/user';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-my-profile',
  imports: [CommonModule, RouterModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent implements OnInit{
  
  courseService = inject(CourseService);
  userService = inject(UserService);
  authService = inject(AuthService);
  myCourses: Course[] = [];

  user = this.userService.getUser();
  

  ngOnInit(): void {
    this.loadCourses();
  }

  private loadCourses(){
    let id: number | null = this.userService.getId();
    this.courseService.getCoursesByUserId(id!).subscribe({
      next: (course)=>{
        this.myCourses = course;
      }
    });
  }
}
