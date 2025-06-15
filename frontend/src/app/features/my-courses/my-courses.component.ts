import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../core/service/course.service';
import { UserService } from '../../core/service/user.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Course } from '../../core/model/entities/course';
import { debounce, debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-courses',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.scss'
})
export class MyCoursesComponent implements OnInit {
  courseService = inject(CourseService);
  userService = inject(UserService);

  searchControl = new FormControl('');

  myCourses: Course[] = [];
  filteredCourses: Course[] = [];

  private subscriptions: Subscription[] = [];
  
  isLoading = true;

  ngOnInit(): void {
    this.loadCourses();
    this.setupSearch();
  }

  private loadCourses(){
    let id: number | null = this.userService.getId();
    const courseSub = this.courseService.getCoursesByUserId(id!).subscribe({
      next: (course)=>{
        this.myCourses = course;
        this.filteredCourses=course;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
      }
    });
    this.subscriptions.push(courseSub);
  }
  private setupSearch(): void {
    const searchSub = this.searchControl.valueChanges.pipe(
      debounceTime(250),
      distinctUntilChanged(),

    ).subscribe(searchTerm=>{
      this.filterCourses(searchTerm || "");
    });
    this.subscriptions.push(searchSub);
  }
  
  private filterCourses(searchTerm: string): void {
    if(!searchTerm.trim()){
      this.filteredCourses =[...this.myCourses];
      return;
    }
     const searchLower = searchTerm.toLowerCase().trim();
    this.filteredCourses = this.myCourses.filter(course => 
      course.name && course.name.toLowerCase().includes(searchLower)
    );
  }
}
