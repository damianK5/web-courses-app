import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Resource } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {

  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public downloadAsset(courseid: number, filename: string): Observable<Blob>
  {
    const params = new HttpParams().set('filename', filename)
    const url = `${this.apiServerUrl}/files/${courseid}/asset`;

    return this.http.get(url, {params, responseType: 'blob'});
  }

  public downloadHomework(courseid:number, filename: string): Observable<Blob>
  {
    const params = new HttpParams().set('filename', filename)
    const url = `${this.apiServerUrl}/files/${courseid}/homework`;

    return this.http.get(url, {params, responseType: 'blob'})
  }

  public downloadAdmission(userID:number, courseID: number, homeworkID: number, filename:string)
  {
    const params = new HttpParams().set('filename', filename).set('userid', userID.toString())
    const url = `${this.apiServerUrl}/files/${courseID}/${homeworkID}`;

    return this.http.get(url, {params, responseType: 'blob'})
  }

    public downloadArchivedAsset(courseid: number, filename: string): Observable<Blob>
  {
    const params = new HttpParams().set('filename', filename)
    const url = `${this.apiServerUrl}/files/archive/${courseid}/asset`;

    return this.http.get(url, {params, responseType: 'blob'});
  }

  public downloadArchivedHomework(courseid:number, filename: string): Observable<Blob>
  {
    const params = new HttpParams().set('filename', filename)
    const url = `${this.apiServerUrl}/files/archive/${courseid}/homework`;

    return this.http.get(url, {params, responseType: 'blob'})
  }

  public downloadArchivedAdmission(userID:number, courseID: number, homeworkID: number, filename:string)
  {
    const params = new HttpParams().set('filename', filename).set('userid', userID.toString())
    const url = `${this.apiServerUrl}/files/archive/${courseID}/${homeworkID}`;

    return this.http.get(url, {params, responseType: 'blob'})
  }
}
