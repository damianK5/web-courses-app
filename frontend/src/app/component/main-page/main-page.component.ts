import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user';
import { catchError } from 'rxjs';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-main-page',
  imports: [],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  authService = inject(AuthService);

  logout() {
    this.authService.logout().subscribe();
  }

  // this was for testing
  // userService = inject(UserService);
  // users = signal<Array<User>>([]);

  // ngOnInit(): void {
  //   this.userService.getUsers()
  //     .pipe(
  //       catchError(err => {
  //         console.log(err);
  //         throw err;
  //       })
  //     ).subscribe((users) => {
  //       this.users.set(users);
  //     });
  // }
}
