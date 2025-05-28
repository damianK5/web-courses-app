import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Homework } from '../model/entities/homework';

@Injectable({
  providedIn: 'root'
})
export class HomeworkService {

  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getHomeworks(): Observable<Homework[]>
  {
    return this.http.get<Homework[]>(`${this.apiServerUrl}/homework/all`);
  }

  public getHomeworksByCourse(id: number): Observable<Homework[]>
  {
    return this.http.get<Homework[]>(`${this.apiServerUrl}/homework/find/course/${id}`);
  }

  public getHomeworkById(id: number): Observable<Homework>
  {
    return this.http.get<Homework>(`${this.apiServerUrl}/homework/find/${id}`);
  }

  public addHomework(homework: Homework): Observable<Homework>
  {
    return this.http.post<Homework>(`${this.apiServerUrl}/homework/add}`, homework);
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
