import { Routes } from '@angular/router';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { MainPageComponent } from './component/main-page/main-page.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginPageComponent},
    {path: 'main', component: MainPageComponent}
];
