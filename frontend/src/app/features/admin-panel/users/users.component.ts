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

  // doesn't work properly
  deleteUser(user: User): void {
    if (!confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
      return;
    }

    this.isLoading = true;

    this.enrollmentService.getEnrollmentsByUser(user.id).pipe(
      switchMap(enrollments => {
        if (!enrollments.length) {
          return of(null);
        }
        return forkJoin(
          enrollments.map(enrollment =>
            this.enrollmentService.deleteEnrollment(enrollment.id)
          )
        );
      }),
      switchMap(() => this.userService.deleteUser(user.id)),
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: () => {
        this.users = this.users?.filter(u => u.id !== user.id) || [];
      },
      error: (err) => {
        console.error('Error during deletion:', err);
      }
    });
  }
}
