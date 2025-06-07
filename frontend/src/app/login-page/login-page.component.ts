import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from "../component/login/login.component";

@Component({
  selector: 'app-login-page',
  imports: [LoginComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
}
