import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CourseService } from '../../core/service/course.service';
import { Course } from '../../core/model/entities/course';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Enrollment, EnrollmentType } from '../../core/model/entities/enrollment';
import { EnrollmentDTO} from '../../core/model/entities/enrollmentDTO';
import { EnrollmentService } from '../../core/service/enrollment.service';
import { UserService } from '../../core/service/user.service';

@Component({
  selector: 'app-enrollment',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './enrollment.component.html',
  styleUrl: './enrollment.component.scss'
})
export class EnrollmentComponent  implements OnInit{
  private courseService = inject(CourseService);
  private enrollmentService = inject(EnrollmentService);
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  

  course: Course | undefined;
  password: String | undefined;
  enteredPassword = '';
  errorMessage = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.courseService.getCoursesById(+id!).subscribe({
      next: (course) => {
        this.course = course;
        this.password=course.password;
      }
    })
  }
  onSubmit(){
    let id: number | null = this.userService.getId();
    if(this.password === this.enteredPassword || !this.password){
      const newEnrollment: EnrollmentDTO = {
        user_id: id!,
        course_id:this.course?.id!,
        confirmed:true,
        type: EnrollmentType.STUDENT
      };
      this.enrollmentService.addEnrollment(newEnrollment).subscribe();
      this.router.navigate(['/course', this.course?.id]);
      

    }
    else{
      this.errorMessage = 'Nieprawidłowy kod';
    }
  }
}

