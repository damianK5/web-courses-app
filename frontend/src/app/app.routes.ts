import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from './/main-page/main-page.component';
import { AuthGuardService } from './service/auth-guard.service';

export const routes: Routes = [
    { path: 'login', component: LoginPageComponent },
    { path: '', component: MainPageComponent, canActivate: [AuthGuardService] },
    { path: '**', redirectTo: '' }
];
