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
import { RegisterComponent } from './features/admin-panel/register/register.component';
import { UsersComponent } from './features/admin-panel/users/users.component';
import { CoursesComponent } from './features/admin-panel/courses/courses.component';
import { TasksComponent } from './features/admin-panel/tasks/tasks.component';
import { AdmissionsForHomeworkComponent } from './features/admissions-for-homework/admissions-for-homework.component';
import { AdmissionReviewComponent } from './features/admission-review/admission-review.component';
import { CreateCourseComponent } from './features/create-course/create-course.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: '', component: MainPageComponent, canActivate: [AuthGuardService] },
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
  { path: 'course-report/:id', component: CourseReportComponent, canActivate: [AuthGuardService] },
  { 
    path: 'admin-panel',
    component: AdminPanelComponent,
    children: [
      { 
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthGuardService] 
      },
      { 
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuardService] 
      },
      { 
        path: 'courses',
        component: CoursesComponent,
        canActivate: [AuthGuardService] 
      },
      { 
        path: 'tasks',
        component: TasksComponent,
        canActivate: [AuthGuardService] 
      },
      // Default route redirects to register
      { 
        path: '',
        redirectTo: 'register',
        pathMatch: 'full'
      }
    ]
  },
  { path: 'homework/:id/see-admissions', component:AdmissionsForHomeworkComponent, canActivate: [AuthGuardService]},
  { path: 'admission/:id', component:AdmissionReviewComponent, canActivate: [AuthGuardService]},
  { path: 'courses/create', component:CreateCourseComponent, canActivate: [AuthGuardService]},

];

