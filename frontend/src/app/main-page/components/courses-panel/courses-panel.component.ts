import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { CourseService } from '../../../service/course.service';
import { CommonModule } from '@angular/common';
import { map, Observable, tap } from 'rxjs';
import { Course } from '../../../model/entities/course';

@Component({
  selector: 'app-courses-panel',
  imports: [CommonModule],
  templateUrl: './courses-panel.component.html',
  styleUrl: './courses-panel.component.scss'
})
export class CoursesPanelComponent implements OnInit{
  userService = inject(UserService);
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