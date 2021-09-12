import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  getRoles(): Observable<any>{
    return this.http.get<Role[]>(`${environment.serverUrl}/api/admin/roles`)
  }

  // createUser(userDto: UserForCreationDto): Observable<void>{
  //   return this.http.post<void>(`${environment.serverUrl}/api/admin/users`, userDto)
  // }

  // getUserById(id: string): Observable<User>{
  //   return this.http.get<User>(`${environment.serverUrl}/api/admin/users${id}`)
  // }

  // updateUser(id: string, userDto: UserForUpdateDto): Observable<User>{
  //   return this.http.put<User>(`${environment.serverUrl}/api/admin/users/${id}`, userDto)
  // }

  // deleteUser(id: string): Observable<void>{
  //   return this.http.delete<void>(`${environment.serverUrl}/api/admin/users/${id}`)
  // }

  // getUserRoles(id: string): Observable<string[]>{
  //   return this.http.get<string[]>(`${environment.serverUrl}/api/admin/users${id}/roles`)
  // }
}
