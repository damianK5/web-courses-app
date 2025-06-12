import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Course } from '../model/entities/course';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiServerUrl = environment.apiUrl;

  private currentCoursesSubject = new BehaviorSubject<Course[] | null>(null);
  public currentCourses$ = this.currentCoursesSubject.asObservable();

  private allCoursesSubject = new BehaviorSubject<Course[] | null>(null);
  public allCourses$ = this.allCoursesSubject.asObservable();
  

  setUserCourses(courses: Course[]) {
    return this.currentCoursesSubject.next(courses);
  }

  setAllcources(courses: Course[]){
    return this.allCoursesSubject.next(courses);
  }

  getCurrentCourses(): Course[] | null {
    return this.currentCoursesSubject.value;
  }

  toString(){
    this.currentCourses$.subscribe(courses => {
      if (courses){
        console.log(courses.map(c =>c.name).join (", "));
      }
    })
  }

  constructor(private http: HttpClient) { }

  public getCourses(): Observable<Course[]>
  {
    return this.http.get<Course[]>(`${this.apiServerUrl}/course/all`).pipe(
      tap(courses=>this.setAllcources(courses)),
      catchError(error => {
        console.error('Failed to fetch user details', error);
        return throwError(() => error);
      })
    );
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
  
  public getCoursesByUserId(userId:number):Observable<Course[]>{
    return this.http.get<Course[]>(`${this.apiServerUrl}/course/user/${userId}`).pipe(
      tap(courses => this.setUserCourses(courses)),
      catchError(error => {
        console.error('Failed to fetch user details', error);
        return throwError(() => error);
      })
    );
  }
}
