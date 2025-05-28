import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admission } from '../model/entities/admission';

@Injectable({
  providedIn: 'root'
})
export class AdmissionService {

    private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getAdmissions(): Observable<Admission[]>
  {
    return this.http.get<Admission[]>(`${this.apiServerUrl}/admission/all`);
  }

  public getAdmissionById(id: number): Observable<Admission>
  {
    return this.http.get<Admission>(`${this.apiServerUrl}/admission/find/${id}`);
  }

  public getAdmissionByHomeworkId(id: number): Observable<Admission[]>
  {
    return this.http.get<Admission[]>(`${this.apiServerUrl}/admission/find/homework/${id}`);
  }

    public getAdmissionByUserId(id: number): Observable<Admission[]>
  {
    return this.http.get<Admission[]>(`${this.apiServerUrl}/admission/find/user/${id}`);
  }
  
  public addAdmission(admission: Admission): Observable<Admission>
  {
    return this.http.post<Admission>(`${this.apiServerUrl}/admission/add`, admission);
  }

  public updateAdmission(admission: Admission): Observable<Admission>
  {
    return this.http.put<Admission>(`${this.apiServerUrl}/admission/update`, admission);
  }

  public deleteAdmission(id: number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiServerUrl}/admission/delete/${id}`);
  }


  
}
