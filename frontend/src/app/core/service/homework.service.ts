import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Homework } from '../model/entities/homework';
import { HomeworkDTO } from '../model/entities/homeworkDTO';

@Injectable({
  providedIn: 'root'
})
export class HomeworkService {

  private apiServerUrl = environment.apiUrl;

  private currentHomeworkSubject = new BehaviorSubject<Homework[] | null>(null);
  public currentHomework$ = this.currentHomeworkSubject.asObservable();

  setHomeworks(homeworks:Homework[]){
    return this.currentHomeworkSubject.next(homeworks);
  }

  getCurrentHomeworks(): Homework[]{
    return this.currentHomeworkSubject.value?? [];
  }

  updateCurrentHomeworks(homeworks:Homework[]){
    return this.currentHomeworkSubject.next([...(this.currentHomeworkSubject.value ?? []),...homeworks]);
  }

  constructor(private http: HttpClient) { }

  public getHomeworks(): Observable<Homework[]>
  {
    return this.http.get<Homework[]>(`${this.apiServerUrl}/homework/all`);
  }

  public getHomeworksByCourse(id: number): Observable<Homework[]> {
    return this.http.get<Homework[]>(`${this.apiServerUrl}/homework/find/course/${id}`).pipe(
      tap(homeworks => {
        this.setHomeworks(homeworks)
      }
    ),
      catchError(error => {
        console.error('Failed to fetch homeworks', error);
        return throwError(() => error);
      })
    );
  }

  public clearHomeworks(){
    this.currentHomeworkSubject.next(null);
  }

  public getHomeworkById(id: number): Observable<Homework>
  {
    return this.http.get<Homework>(`${this.apiServerUrl}/homework/find/${id}`);
  }

  public addHomework(homework: HomeworkDTO): Observable<Homework>
  {
    return this.http.post<Homework>(`${this.apiServerUrl}/homework/add`, homework);
  }

  public updateHomework(homework: Homework): Observable<Homework>
  {
    return this.http.put<Homework>(`${this.apiServerUrl}/homework/update}`, homework);
  }

  public deleteHomework(id: number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiServerUrl}/homework/delete/${id}`);
  }
}
