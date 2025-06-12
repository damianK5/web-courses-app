import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from '../../core/service/course.service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { Course } from '../../core/model/entities/course';

@Component({
  selector: 'app-all-courses',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.scss'
})
export class AllCoursesComponent implements OnInit, OnDestroy {

  courseService = inject(CourseService);
  searchControl = new FormControl('');
  
  allCourses: Course[] = [];
  filteredCourses: Course[] = [];
  isLoading = true;
  
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
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.filterCourses(searchTerm || '');
    });
    this.subscriptions.push(searchSub);
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