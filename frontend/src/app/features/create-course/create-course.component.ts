import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Course } from '../../core/model/entities/course';
import { CourseService } from '../../core/service/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EnrollmentService } from '../../core/service/enrollment.service';
import { EnrollmentDTO } from '../../core/model/entities/enrollmentDTO';
import { UserService } from '../../core/service/user.service';
import { EnrollmentType } from '../../core/model/entities/enrollment';
import { AccountType, User } from '../../core/model/entities/user';

@Component({
  selector: 'app-create-course',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.scss'
})
export class CreateCourseComponent implements OnInit{
  
  private router = inject(Router);
  private enrollmentService = inject(EnrollmentService);
  courseService = inject(CourseService);
  userService = inject(UserService);
  description: string = "";
  name: string = "";
  password: string = "";
  users: User[] = [];
  teacherId: string = "";

  onSubmit() {
    const course: Course = {
      name: this.name,
      description: this.description,
      password: this.password
    }
    this.courseService.addCourse(course).subscribe({
      next: (course) => {
        if(this.teacherId){
          const enrollmentDTO2:EnrollmentDTO = {
          user_id: +this.teacherId!,
          course_id:course.id!,
           confirmed:true,
          type:EnrollmentType.TEACHER
        }
        this.enrollmentService.addEnrollment(enrollmentDTO2).subscribe()
        }
        
        const enrollmentDTO: EnrollmentDTO = {
          user_id: this.userService.getId()!,
          course_id: course.id!,
          confirmed:true,
          type:EnrollmentType.MAIN_TEACHER
        }
        this.enrollmentService.addEnrollment(enrollmentDTO).subscribe({
          next: (success)=> this.router.navigate(['/course', course.id])
        })
      }
    });
  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users.filter(user=> user.accountType==AccountType.TEACHER && user.id != this.userService.getId())
        console.log(this.users);
      }
    })
  }
}
