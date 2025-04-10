import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../model/login-request';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { LoginResponse } from '../model/login-response';
import { Router } from '@angular/router';
import { DecodedToken } from '../model/token';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServerUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiServerUrl}/api/v1/auth/authenticate`, request)
      .pipe(map(response => {
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
        return response;
      }));
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    // Add token expiration
    return !!token;
  }

  getToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
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

  getCurrentUserRoles(): string[] {
    const token = localStorage.getItem('token'); // Or your storage method
    if (!token) return [];
    return this.decodeToken(token).roles;
  }

  getCurrentUserEmail(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';
    return this.decodeToken(token).sub;
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  logout(): Observable<void> {
    const token = this.getToken();
    
    // clear the token from user's browser
    this.clearAuthData();
    
    if (!token) {
      this.router.navigate(['/login']);
      return of(undefined);
    }

    // clear the token from a backend server
    return this.http.post<void>(`${this.apiServerUrl}/api/v1/auth/logout`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      tap(() => {
        this.router.navigate(['/login']);
      }),
      catchError(error => {
        this.router.navigate(['/login']);
        return throwError(() => error);
      })
    );
  }

  private clearAuthData() {
    localStorage.removeItem('currentUser');
  }
}