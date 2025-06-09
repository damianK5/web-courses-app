 import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/login-page/login-page.component';
import { MainPageComponent } from './features/main-page/main-page.component';
import { AuthGuardService } from './core/service/auth-guard.service';
import { AdminPanelComponent } from './features/admin-panel/admin-panel.component';
import { HomeworkReportComponent } from './features/homework-report/homework-report.component';
import { AllCoursesComponent } from './features/all-courses/all-courses.component';
import { MyCoursesComponent } from './features/my-courses/my-courses.component';import { MyProfileComponent } from './features/my-profile/my-profile.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: '', component: MainPageComponent, canActivate: [AuthGuardService] },
  { path: 'admin-panel', component: AdminPanelComponent },
  { path: 'homework-report', component: HomeworkReportComponent },
  { path: 'courses', component: AllCoursesComponent },
  { path: 'my-courses', component: MyCoursesComponent },
  { path: 'my-profile', component: MyProfileComponent }
];

