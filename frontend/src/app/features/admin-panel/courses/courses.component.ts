import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../../core/service/course.service';
import { Course } from '../../../core/model/entities/course';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  private courseService = inject(CourseService);

  isLoading = true;
  courses: Course[] = [];

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.isLoading = true;

    this.courseService.getCourses().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (courses) => this.courses = courses,
      error: (err) => {
        console.error('Error loading users:', err);
      }
    });
  }

  deleteCourse(course: Course) {
    console.log(course.id);
  }
}
