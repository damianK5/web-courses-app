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
        console.error('Error loading courses:', err);
      }
    });
  }

  deleteCourse(course: Course) {
    if (!confirm(`Czy na pewno chcesz usunąć ${course.name}?`)) {
      return;
    }

    this.isLoading = true;

    this.courseService.deleteCourse(course.id!).subscribe({
      next: () => {
        this.isLoading = false;
        this.loadCourses(); // Update UI after deletion
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Failed to delete course:', err);
      }
    });
  }
}
