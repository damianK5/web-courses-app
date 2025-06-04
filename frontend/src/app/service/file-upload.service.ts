import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public uploadAsset(file: File, courseID: number): Observable<boolean>
  {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<boolean>(`/files/${courseID}/asset`, formData)
  }

  public uploadHomework(file:File, courseID: number): Observable<boolean>

{
  const formData = new FormData();
  formData.append('file', file);
  return this.http.post<boolean>(`/files/${courseID}/homework`, formData)
}

public uploadAdmission(file: File, courseID: number, userID: number, homeworkID: number): Observable<boolean>
{
  const formData = new FormData();
  formData.append('file', file);
  formData.append('userid', userID.toString());
  return this.http.post<boolean>(`/files/${courseID}/${homeworkID}`, formData)
}
}

  
