import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../../../core/service/course.service';
import { CommonModule } from '@angular/common';
import { map, Observable, tap } from 'rxjs';
import { Course } from '../../../../core/model/entities/course';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-courses-panel',
  imports: [CommonModule, RouterLink],
  templateUrl: './courses-panel.component.html',
  styleUrl: './courses-panel.component.scss'
})
export class CoursesPanelComponent implements OnInit{
onAllClick() {
console.log("Entering all courses")
}
onCourseClick(course: Course) {
  console.log(course.description);
}
  courseService = inject(CourseService);
  showButton = false;
  courses$ = this.courseService.currentCourses$;
  displayedCourses$!: Observable<Course[]>;
  
  ngOnInit(): void {
    this.displayedCourses$ = this.courses$.pipe(
      tap(courses => {
        this.showButton = (courses?.length ?? 0) > 3;
      }),
      map(courses => (courses ?? []).slice(0, 3))
    );
  } 
}