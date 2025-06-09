import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Admission } from '../model/entities/admission';

@Injectable({
  providedIn: 'root'
})
export class AdmissionService {

  private apiServerUrl = environment.apiUrl;

  private currentAdmissionSubject = new BehaviorSubject<Admission[] | null>(null);
  public currentAdmission$ = this.currentAdmissionSubject.asObservable();

  constructor(private http: HttpClient) { }

  setAdmissions(Admissions:Admission[]){
      return this.currentAdmissionSubject.next(Admissions);
    }
  
  getCurrentAdmissions(): Admission[]{
    return this.currentAdmissionSubject.value?? [];
  }

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
    return this.http.get<Admission[]>(`${this.apiServerUrl}/admission/find/user/${id}`).pipe(
      tap(admissions => this.setAdmissions(admissions)),
      catchError(error => {
        console.error('Failed to fetch admission details', error);
        return throwError(() => error);
      })
    );
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
