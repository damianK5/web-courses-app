import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RegisterRequest } from '../model/register-request';
import { LoginResponse } from '../model/login-response';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(request: RegisterRequest) {
    return this.http.post<LoginResponse>(`${this.apiServerUrl}/api/v1/auth/register`, request)
    .pipe(map(response => {
      return response;
    }));
  }
}
