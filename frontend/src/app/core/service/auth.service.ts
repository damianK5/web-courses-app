import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginRequest } from '../model/login-request';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { LoginResponse } from '../model/login-response';
import { Router } from '@angular/router';
import { DecodedToken } from '../model/token';
import { jwtDecode } from "jwt-decode";
import { User } from '../model/entities/user';
import { UserService } from './user.service';
import { ChangePasswordDTO } from '../model/entities/change-passwordDTO';
import { HomeworkService } from './homework.service';
import { CourseService } from './course.service';
import { AdmissionService } from './admission.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServerUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  userService = inject(UserService);
  homeworkService = inject(HomeworkService);
  courseService = inject(CourseService);
  admissionService = inject(AdmissionService);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('loggedUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiServerUrl}/api/v1/auth/authenticate`, request)
      .pipe(map(response => {
        localStorage.setItem('loggedUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
        return response;
      }));
  }

  changePassword(changePasswordDTO: ChangePasswordDTO) {
    return this.http.post<LoginResponse>(`${this.apiServerUrl}/api/v1/auth/change-password`, changePasswordDTO)
      .pipe(tap(response => {
        localStorage.setItem('loggedUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
      }));
  }

  getCurrentUserDetails(): Observable<User> {
    return this.userService.getUserByEmail(this.getCurrentUserEmail()).pipe(
      tap(user => {
        if (!user) {
          throw new Error('User not found');
        }
        this.userService.setUser(user);
      }),
      catchError(error => {
        console.error('User fetch failed:', error);
        // Optionally clear invalid token
        if (error.status === 401) {
          this.logout;
        }
        return throwError(() => error);
      })
    );
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  getToken() {
    const currentUser = JSON.parse(localStorage.getItem('loggedUser')!);
    return currentUser?.token;
  }

  decodeToken(token: string): DecodedToken {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      throw new Error('Invalid token');
    }
  }

  getCurrentUserRole(): string {
    const token = this.getToken();
    if (!token) return '';

    const decoded = this.decodeToken(token);

    if (!decoded.roles) return '';

    return Array.isArray(decoded.roles)
      ? decoded.roles[0]
      : decoded.roles;
  }

  isAdmin(): boolean {
    const role = this.getCurrentUserRole();
    return role === 'ADMIN';
  }

  isTeacher(): boolean {
    const role = this.getCurrentUserRole();
    return role === 'TEACHER';
  }

  isStudent(): boolean {
    const role = this.getCurrentUserRole();
    return role === 'STUDENT';
  }

  getCurrentUserEmail(): string {
    const token = this.getToken();
    if (!token) return '';
    return this.decodeToken(token).sub;
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  logout(): void {
    this.currentUserSubject.next(null);
    const token = this.getToken();

    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private clearAuthData() {
    localStorage.removeItem('loggedUser');
    this.userService.clearUser();
    this.courseService.clearCourses();
    this.homeworkService.clearHomeworks();
    this.admissionService.clearAdmissions();
  }

  isTokenValid(token: string): boolean {
    try {
      const base64Url = token.split('.')[1];
      if (!base64Url) return false;

      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));

      if (!payload.exp) return false;

      return payload.exp > Math.floor(Date.now() / 1000);
    } catch (e) {
      return false;
    }
  }
}