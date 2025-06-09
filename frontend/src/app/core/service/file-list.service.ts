import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileListService {
private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getAssetFilesList(courseID: number): Observable<string[]>
  {
    const url = `${this.apiServerUrl}/files/${courseID}/asset/list`
    return this.http.get<string[]>(url);
  }

    public getHomeworkFilesList(courseID: number): Observable<string[]>
  {
    const url = `${this.apiServerUrl}/files/${courseID}/homework/list`
    return this.http.get<string[]>(url);
  }

  public getAdmissionFilesList(courseID: number, userID: number, homeworkID: number): Observable<string[]>
  {
    const url = `${this.apiServerUrl}/files/${courseID}/${homeworkID}/list`
    return this.http.get<string[]>(url);
  }

    public getArchivedAssetFilesList(courseID: number): Observable<string[]>
  {
    const url = `${this.apiServerUrl}/files/archive/${courseID}/asset/list`
    return this.http.get<string[]>(url);
  }

    public getArchivedHomeworkFilesList(courseID: number): Observable<string[]>
  {
    const url = `${this.apiServerUrl}/files/archive/${courseID}/homework/list`
    return this.http.get<string[]>(url);
  }

  public getArchivedAdmissionFilesList(courseID: number, userID: number, homeworkID: number): Observable<string[]>
  {
    const url = `${this.apiServerUrl}/files/archive/${courseID}/${homeworkID}/list`
    return this.http.get<string[]>(url);
  }
}
