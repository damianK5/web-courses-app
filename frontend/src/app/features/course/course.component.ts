import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../core/service/course.service';
import { UserService } from '../../core/service/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course',
  imports: [CommonModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent implements OnInit {
  
  courseService = inject(CourseService);
  myCourses = this.courseService.currentCourses$;
  userService = inject(UserService);

  ngOnInit(): void {
    let id: number | null = this.userService.getId();
    if (id){
      this.courseService.getCoursesByUserId(id);  
    }
  }

}
