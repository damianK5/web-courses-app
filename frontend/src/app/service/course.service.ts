import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../model/entities/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getCourses(): Observable<Course[]>
  {
    return this.http.get<Course[]>(`${this.apiServerUrl}/course/all`);
  }

  public getCoursesById(id: number): Observable<Course>
  {
    return this.http.get<Course>(`${this.apiServerUrl}/course/find/${id}`);
  }

  public addCourse(course: Course): Observable<Course>
  {
    return this.http.post<Course>(`${this.apiServerUrl}/course/add`, course);
  }

    public updateCourse(course: Course): Observable<Course>
  {
    return this.http.put<Course>(`${this.apiServerUrl}/course/update`, course);
  }

  public deleteCourse(id: number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiServerUrl}/course/delete/${id}`);
  }
}
