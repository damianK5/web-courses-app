import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../model/login-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private auth: AuthService) {}

  router = inject(Router);

  userFrom: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  request: LoginRequest = new LoginRequest;

  login() {
    const formValue = this.userFrom.value;

    this.request.email = formValue.email;
    this.request.password = formValue.password;

    this.auth.login(this.request).subscribe({
      next: (res) => {
        console.log('Received response: ' + res.token);
        this.router.navigate(['/']);
      }, error: (err) => {
        console.log('Error response: ' + err);
      }
    });
  }
}
