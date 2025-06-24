import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../core/service/user.service';
import { User } from '../../../core/model/entities/user';
import { Enrollment } from '../../../core/model/entities/enrollment';
import { finalize, forkJoin, of, switchMap } from 'rxjs';
import { EnrollmentService } from '../../../core/service/enrollment.service';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService);
  private enrollmentService = inject(EnrollmentService);

  isLoading = true;
  users: User[] = [];

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;

    this.userService.getUsers().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (users) => this.users = users,
      error: (err) => {
        console.error('Error loading users:', err);
      }
    });
  }

  deleteUser(user: User): void {
    if (!confirm(`Czy na pewno chcesz usunąć ${user.firstName} ${user.lastName}?`)) {
      return;
    }

    this.isLoading = true;

    this.userService.deleteUser(user.id).subscribe({
      next: () => {
        this.isLoading = false;
        this.loadUsers(); // Update UI after deletion
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Failed to delete user:', err);
      }
    });
  }
}
