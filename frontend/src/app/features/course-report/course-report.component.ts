import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

import { CourseService } from '../../core/service/course.service';
import { HomeworkService } from '../../core/service/homework.service';
import { AdmissionService } from '../../core/service/admission.service';
import { EnrollmentService } from '../../core/service/enrollment.service';

import { Course } from '../../core/model/entities/course';
import { Homework } from '../../core/model/entities/homework';
import { Enrollment, EnrollmentType } from '../../core/model/entities/enrollment';

@Component({
  selector: 'app-course-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-report.component.html',
  styleUrls: ['./course-report.component.scss']
})
export class CourseReportComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);
  private homeworkService = inject(HomeworkService);
  private admissionService = inject(AdmissionService);
  private enrollmentService = inject(EnrollmentService);

  course: Course | null = null;
  homeworks: Homework[] = [];
  submissionsCount: Record<number, number> = {};
  enrollments: Enrollment[] = [];
  expectedAdmissions = 0;

  ngOnInit(): void {
    const id = +(this.route.snapshot.paramMap.get('id') ?? 0);
    if (!id) return;

    forkJoin({
      course: this.courseService.getCoursesById(id),
      homeworks: this.homeworkService.getHomeworksByCourse(id),
      enrollments: this.enrollmentService.getEnrollmentsByCourse(id)
    }).subscribe(({ course, homeworks, enrollments }) => {
      this.course = course;
      this.homeworks = homeworks;
      this.enrollments = enrollments.filter(e => e.confirmed && e.type === EnrollmentType.STUDENT);
      this.expectedAdmissions = this.enrollments.length;

      if (!homeworks.length) return;
      const admissionRequests = homeworks.map(hw =>
        this.admissionService.getAdmissionByHomeworkId(hw.id)
      );

      forkJoin(admissionRequests).subscribe(allAdmissions => {
        allAdmissions.forEach((admissions, idx) => {
          const hwId = homeworks[idx].id;
          this.submissionsCount[hwId] = admissions.length;
        });
      });
    });
  }
  getSubmittedCount(hwId: number): number {
    return this.submissionsCount[hwId] ?? 0;
  }
}