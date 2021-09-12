import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PasswordChangeDto, Role, User, UserForCreationDto, UserForUpdateDto } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any>{
    return this.http.get<User[]>(`${environment.serverUrl}/api/admin/users`)
  }

  createUser(userDto: UserForCreationDto): Observable<void>{
    return this.http.post<void>(`${environment.serverUrl}/api/admin/users`, userDto)
  }

  getUserById(id: string): Observable<User>{
    return this.http.get<User>(`${environment.serverUrl}/api/admin/users/${id}`)
  }

  updateUser(id: string, userDto: UserForUpdateDto): Observable<User>{
    return this.http.put<User>(`${environment.serverUrl}/api/admin/users/${id}`, userDto)
  }

  deleteUser(id: string): Observable<void>{
    return this.http.delete<void>(`${environment.serverUrl}/api/admin/users/${id}`)
  }

  getUserRoles(id: string): Observable<Role[]>{
    return this.http.get<Role[]>(`${environment.serverUrl}/api/admin/users/${id}/roles`)
  }

  changePassword(id: string, passwords: PasswordChangeDto): Observable<any>{
    return this.http.put<any>(`${environment.serverUrl}/api/admin/users/${id}/password-change`, passwords)
  }



}
