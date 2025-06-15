import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../core/service/course.service';
import { UserService } from '../../core/service/user.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../core/model/entities/course';
import { HomeworkService } from '../../core/service/homework.service';
import { Homework } from '../../core/model/entities/homework';

@Component({
  selector: 'app-course',
  imports: [CommonModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent implements OnInit {
  private courseService = inject(CourseService);
  private homeworkService = inject(HomeworkService);
  private route = inject(ActivatedRoute);
  isLoading = true;

  course:Course | undefined;
  homeworks: Homework[] | undefined;

  ngOnInit(): void {
    this.loadCourse();
  }

  private loadCourse(){
    const id = this.route.snapshot.paramMap.get('id');
    this.courseService.getCoursesById(+id!).subscribe({
      next: (course) =>{
        this.course=course;
        this.homeworkService.getHomeworksByCourse(+id!).subscribe({
          next: (homeworks) => {
            this.homeworks = homeworks;
            this.isLoading = false;
          }
        })
      }
    });
  }

}
