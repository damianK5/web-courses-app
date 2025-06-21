import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterRequest } from '../../core/model/register-request';
import { RegisterService } from '../../core/service/register.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private registerService: RegisterService) {}

  isRegistered: boolean = false;
  isRegisterError: boolean = false;
  isLoading: boolean = false;
  formNotVaild: boolean = false;

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    accountType: new FormControl(2, [Validators.required]) // default is 2 (student)
  })

  request: RegisterRequest = new RegisterRequest;

  register() {
    this.isRegistered = false;
    this.isRegisterError = false;
    this.formNotVaild = false;
    
    if (this.registerForm.valid) {
      this.isLoading = true;

      const formValue = this.registerForm.value;

      this.request.email = formValue.email;
      this.request.password = formValue.password;
      this.request.firstname = formValue.firstName;
      this.request.lastname = formValue.lastName;
      this.request.accountType = Number(formValue.accountType);

      console.log(this.request);

      this.registerService.register(this.request).subscribe({
        next: (res) => {
          console.log('Received response: ' + res.token);
          this.isRegistered = true;
          this.isLoading = false;
          
        }, error: (err) => {
          console.log('Error response: ' + err);
          this.isRegisterError = true;
          this.isLoading = false;
        }
      });
    } else {
      this.formNotVaild = true;
    }
  }
}
