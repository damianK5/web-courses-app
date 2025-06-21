import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../core/model/login-request';
import { Router } from '@angular/router';
import { UserService } from '../../core/service/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private auth: AuthService) {}
  userService = inject(UserService);
  router = inject(Router);

  isLoading: boolean = false;
  formNotVaild: boolean = false;
  loginError: boolean = false;

  userFrom: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  request: LoginRequest = new LoginRequest;

  login() {
    this.formNotVaild = false;
    this.loginError = false;

    if (this.userFrom.valid) {
      this.isLoading = true;

      const formValue = this.userFrom.value;

      this.request.email = formValue.email;
      this.request.password = formValue.password;

      this.auth.login(this.request).subscribe({
        next: (res) => {
          console.log('Received response: ' + res.token);
          this.isLoading = false;
          this.router.navigate(['/']);
        }, error: (err) => {
          console.log('Error response: ' + err);
          this.loginError = true;
          this.isLoading = false;
        }
      });
    } else {
      this.formNotVaild = true;
    }
  }
}
