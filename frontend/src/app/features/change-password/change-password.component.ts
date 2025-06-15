import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../core/service/user.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/service/auth.service';
import { ChangePasswordDTO } from '../../core/model/entities/change-passwordDTO';

@Component({
  selector: 'app-change-password',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {
  enteredOldPassword: string | undefined;
  enteredNewPassword: string | undefined;
  errorMessage: string | undefined;
    
  userService = inject(UserService);
  authService = inject(AuthService);
  enteredPassword: any;

  
  ngOnInit(): void {
  
  
  }

  onSubmit() {
    if (!this.enteredOldPassword || !this.enteredNewPassword) {
    console.error('Both old and new passwords are required');
    return;
  }

  if (this.enteredNewPassword.length < 6) { // Adjust minimum length as needed
    console.error('New password must be at least 6 characters');
    return;
  }

    let id: number | null = this.userService.getId();
    const changePasswordDTO: ChangePasswordDTO = {
      newPassword: this.enteredNewPassword!,
      oldPassword: this.enteredOldPassword!,
      userId: id!

    }
    this.authService.changePassword(changePasswordDTO).subscribe({
      next: (response) =>{
        console.log('success', response);
      },
      error: (error) => {
        this.errorMessage = error["error"]["message"];
      }
    });
  }

}
