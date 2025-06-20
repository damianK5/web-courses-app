 import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/login-page/login-page.component';
import { MainPageComponent } from './features/main-page/main-page.component';
import { AuthGuardService } from './core/service/auth-guard.service';
import { AdminPanelComponent } from './features/admin-panel/admin-panel.component';
import { HomeworkReportComponent } from './features/homework-report/homework-report.component';
import { AllCoursesComponent } from './features/all-courses/all-courses.component';
import { MyCoursesComponent } from './features/my-courses/my-courses.component';import { MyProfileComponent } from './features/my-profile/my-profile.component';
import { CourseComponent } from './features/course/course.component';
import { EnrollmentComponent } from './features/enrollment/enrollment.component';
import { ChangePasswordComponent } from './features/change-password/change-password.component';
import { HomeworkComponent } from './features/homework/homework.component';
import { AddHomeworkComponent } from './features/add-homework/add-homework.component';
import { AddAssetComponent } from './features/add-asset/add-asset.component';
import { CourseReportComponent } from './features/course-report/course-report.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: '', component: MainPageComponent, canActivate: [AuthGuardService] },
  { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuardService] },
  { path: 'homework-report', component: HomeworkReportComponent, canActivate: [AuthGuardService] },
  { path: 'courses', component: AllCoursesComponent, canActivate: [AuthGuardService] },
  { path: 'my-courses', component: MyCoursesComponent, canActivate: [AuthGuardService] },
  { path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuardService] },
  { path: 'course/:id', component: CourseComponent, canActivate: [AuthGuardService] },
  { path: 'enrollment/:id', component: EnrollmentComponent, canActivate: [AuthGuardService] },
  { path: 'change-password', component:ChangePasswordComponent, canActivate: [AuthGuardService] },
  { path: 'homework/:id', component: HomeworkComponent, canActivate: [AuthGuardService]},
  { path: 'my-homeworks', component: HomeworkReportComponent, canActivate: [AuthGuardService]},
  { path: 'course/:courseId/create-homework', component: AddHomeworkComponent, canActivate: [AuthGuardService]},
  { path: 'course/:courseId/add-asset', component: AddAssetComponent, canActivate: [AuthGuardService]},
  { path: 'course-report/:id', component: CourseReportComponent, canActivate: [AuthGuardService] }
];

