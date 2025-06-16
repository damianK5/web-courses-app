import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, of, switchMap } from 'rxjs';

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

      return this.http.post<boolean>(`${this.apiServerUrl}/files/${courseID}/asset`, formData).pipe
      (
        switchMap (success => 
        {
          if (success)
          {
            return this.http.post<boolean>(`${this.apiServerUrl}/files/archive/${courseID}/asset`, formData)
          }
          else {return of(false)}
        })
      )
    }

    public uploadHomework(file:File, courseID: number): Observable<boolean>

  {
    const formData = new FormData();
    formData.append('files', file);
    return this.http.post<boolean>(`${this.apiServerUrl}/files/${courseID}/homework`, formData).pipe
      (
        switchMap (success => 
        {
          if (success)
          {
            return this.http.post<boolean>(`${this.apiServerUrl}/files/archive/${courseID}/homework`, formData)
          }
          else {return of(false)}
        })
      )
  }

  public uploadAdmission(files: File[], courseID: number, userID: number, homeworkID: number): Observable<boolean>
  {
    const formData = new FormData();
    for (const file of files) {
      formData.append('file', file);
    }
    formData.append('userid', userID.toString());
    return this.http.post<boolean>(`${this.apiServerUrl}/files/${courseID}/${homeworkID}`, formData).pipe
    (
      switchMap (success => 
      {
        if (success)
        {
          return this.http.post<boolean>(`${this.apiServerUrl}/files/archive/${courseID}/${homeworkID}`, formData)
        }
        else {return of(false)}
      })
    )
  }
}

  
