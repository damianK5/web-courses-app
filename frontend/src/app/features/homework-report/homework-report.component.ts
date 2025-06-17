import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../core/service/user.service';
import { CourseService } from '../../core/service/course.service';
import { HomeworkService } from '../../core/service/homework.service';
import { AdmissionService } from '../../core/service/admission.service';
import { Course } from '../../core/model/entities/course';
import { forkJoin } from 'rxjs';
import { Homework } from '../../core/model/entities/homework';
import { Admission } from '../../core/model/entities/admission';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

type Row = {
  courseID: number,
  homework: Homework;
  admission: Admission | null;
};

@Component({
  selector: 'app-homework-report',
  imports: [CommonModule, RouterModule],
  templateUrl: './homework-report.component.html',
  styleUrl: './homework-report.component.scss'
})
export class HomeworkReportComponent implements OnInit {
  userService = inject(UserService);
  courseService = inject(CourseService);
  homeworkService = inject(HomeworkService);
  admissionService = inject(AdmissionService);

  myCourses: Course[] = [];
  myHomeworks: Homework[] = [];
  myAdmissions: Admission[] = [];
  rows: Row[] = [];
  toggleStates: { [courseId: number]: boolean } = {};

  ngOnInit(): void {
    let id: number | null = this.userService.getId();
    this.admissionService.getAdmissionByUserId(id!).subscribe({
      next: (admissions) => this.myAdmissions = admissions
    });
    this.courseService.getCoursesByUserId(id!).subscribe({
      next: (courses) => {
        this.myCourses = courses;
        const homeworkRequests = courses.map(course => 
          this.homeworkService.getHomeworksByCourse(course.id)
        );
        forkJoin(homeworkRequests).subscribe({
          next: (allHomeworkArrays) => {
            this.myHomeworks = [...this.myHomeworks, ...allHomeworkArrays.flat()];      
            for (const homework of this.myHomeworks){
              const admission = this.myAdmissions.find(a=>a.homework.id===homework.id);
              this.rows.push({
                courseID: homework.course.id,
                homework: homework,
                admission: admission ?? null
              });
            }
          },
          error: (error) => {
            console.error("Failed to load homeworks", error);
          }
        });
      }
    });
  }

  toggleCourse(courseId: number): void {
    this.toggleStates[courseId] = !this.toggleStates[courseId];
  }

  getRowsPerCourse(id: number): Row[] {
    return this.rows.filter(row => row.courseID === id);
  }

  getHomeworkCount(courseId: number): number {
    return this.getRowsPerCourse(courseId).length;
  }

  getSubmittedCount(courseId: number): number {
    return this.getRowsPerCourse(courseId).filter(row => row.admission !== null).length;
  }
}