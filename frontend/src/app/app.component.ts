import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './model/user';
import { UserService } from './service/user.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'frontend';

  userService = inject(UserService);
  users = signal<Array<User>>([]);

  ngOnInit(): void {
    this.userService.getUsers()
      .pipe(
        catchError(err => {
          console.log(err);
          throw err;
        })
      ).subscribe((users) => {
        this.users.set(users);
      });
  }
}
