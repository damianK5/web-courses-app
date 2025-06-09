import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileDeleteService {
private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public deleteAssetFile(filename: string, courseID: number): Observable<boolean>
  {
    const params = new HttpParams().set('filename', filename)
    const url = `${this.apiServerUrl}/files/${courseID}/asset`;
    return this.http.delete<boolean>(url, {params: params})
  }

  public deleteHomeworkFile(filename: string, courseID: number):Observable<boolean>
   {
    const params = new HttpParams().set('filename', filename)
    const url = `${this.apiServerUrl}/files/${courseID}/homework`;
    return this.http.delete<boolean>(url, {params: params})
  }

  public deleteAdmissionFile(filename: string, userID: number, courseID: number, homeworkID:number)
  {
    const params = new HttpParams().set('filename', filename).set('userid', userID.toString())
    const url = `${this.apiServerUrl}/files/${courseID}/${homeworkID}`
    return this.http.delete<boolean>(url, {params: params})
  }

    public deleteArchivedAssetFile(filename: string, courseID: number): Observable<boolean>
  {
    const params = new HttpParams().set('filename', filename)
    const url = `${this.apiServerUrl}/files/archive/${courseID}/asset`;
    return this.http.delete<boolean>(url, {params: params})
  }

  public deleteArchivedHomeworkFile(filename: string, courseID: number):Observable<boolean>
   {
    const params = new HttpParams().set('filename', filename)
    const url = `${this.apiServerUrl}/files/archive/${courseID}/homework`;
    return this.http.delete<boolean>(url, {params: params})
  }

  public deleteArchivedAdmissionFile(filename: string, userID: number, courseID: number, homeworkID:number)
  {
    const params = new HttpParams().set('filename', filename).set('userid', userID.toString())
    const url = `${this.apiServerUrl}/files/archive/${courseID}/${homeworkID}`
    return this.http.delete<boolean>(url, {params: params})
  }

}
