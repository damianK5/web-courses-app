import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from '../../core/service/course.service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { Course } from '../../core/model/entities/course';
import { UserService } from '../../core/service/user.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-courses',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.scss'
})
export class AllCoursesComponent implements OnInit, OnDestroy {

  courseService = inject(CourseService);
  userService = inject(UserService);
  searchControl = new FormControl('');
  
  allCourses: Course[] = [];
  filteredCourses: Course[] = [];
  userCourses: Course[] = [];
  isLoading = true;
  isTeacher = this.userService.isTeacher();
  isAdmin = this.userService.isAdmin();

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.loadCourses();
    this.setupSearch();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private loadCourses(): void {
    const courseSub = this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.allCourses = courses;
        this.filteredCourses = courses;
      },
      error: (error) => {
        this.isLoading = false;
      }
    });
    this.subscriptions.push(courseSub);
    
    let id: number | null = this.userService.getId();
    this.courseService.getCoursesByUserId(id!).subscribe({
      next: (course)=>{
        this.userCourses = course;
        this.isLoading = false;
      },
    });
  }

  private setupSearch(): void {
    const searchSub = this.searchControl.valueChanges.pipe(
      debounceTime(250),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.filterCourses(searchTerm || '');
    });
    this.subscriptions.push(searchSub);
  }

  isUserEnrolled(courseId: number): boolean {
    return this.userCourses?.some(userCourse => userCourse.id === courseId);
  }

  private filterCourses(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.filteredCourses = [...this.allCourses];
      return;
    }
    const searchLower = searchTerm.toLowerCase().trim();
    this.filteredCourses = this.allCourses.filter(course => 
      course.name && course.name.toLowerCase().includes(searchLower)
    );
  }
}