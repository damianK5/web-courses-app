import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccountType, User } from '../model/entities/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null> (null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { 
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser)
      this.currentUserSubject.next(JSON.parse(storedUser));
  }

  setUser(user: User){
    localStorage.setItem('currentUser', JSON.stringify(user));
    return this.currentUserSubject.next(user);
  }
  
  getUser(): User | null {
    return this.currentUserSubject.value;
  }

  getId(): number | null
{
  return this.currentUserSubject.value?.id || null;
}
  isTeacher():boolean{
    return this.currentUserSubject.value?.accountType==AccountType.TEACHER
  }
  isAdmin():boolean{
    return this.currentUserSubject.value?.accountType==AccountType.ADMIN
  }
  isStudent():boolean{
    return this.currentUserSubject.value?.accountType==AccountType.STUDENT
  }

  toString(){
    this.currentUser$.subscribe(user => {
      if (user){
        console.log(user.firstName)
      }
    })
  }

  clearUser(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/user/all`);
  }

  public getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/find-email/${email}`);
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/user/add`, user);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/user/update`, user);
  }

  public deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/user/delete/${userId}`);
  }
}
