import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../model/entities/user';
import { catchError } from 'rxjs';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-main-page',
  imports: [],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  authService = inject(AuthService);
  email: string = '';
  roles: string[] = [];

  ngOnInit(): void {
    const token = localStorage.getItem('currentUser');
    if (token) {
      const decoded = this.authService.decodeToken(token);
      this.email = decoded.sub;
      this.roles = decoded.roles;
    }
  }

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
