import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enrollment } from '../model/entities/enrollment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

    private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getEnrollments(): Observable<Enrollment[]>
  {
    return this.http.get<Enrollment[]>(`${this.apiServerUrl}/enrollment/all`);
  }

  public getEnrollmentsByCourse(id: number): Observable<Enrollment[]>
  {
    return this.http.get<Enrollment[]>(`${this.apiServerUrl}/enrollment/find/course/${id}`);
  }

  public getEnrollmentsByUser(id: number): Observable<Enrollment[]>
  {
    return this.http.get<Enrollment[]>(`${this.apiServerUrl}/enrollment/find/user/${id}`);
  }
  
  public getEnrollmentById(id: number): Observable<Enrollment>
  {
    return this.http.get<Enrollment>(`${this.apiServerUrl}/enrollment/find/${id}`);
  }

  public addEnrollment(enrollment: Enrollment): Observable<Enrollment>
  {
    return this.http.post<Enrollment>(`${this.apiServerUrl}/enrollment/add`, enrollment);
  }

  public updateEnrollment(enrollment: Enrollment): Observable<Enrollment>
  {
    return this.http.put<Enrollment>(`${this.apiServerUrl}/enrollment/update`, enrollment);
  }

  public deleteEnrollment(id: number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiServerUrl}/enrollment/delete/${id}`);
  }

}
