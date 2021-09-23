import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Permission, PermissionForRole, Role, RoleForCreationDto } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  getRoles(): Observable<any>{
    return this.http.get<Role[]>(`${environment.serverUrl}/api/admin/roles`)
  }

  createRole(roleDto: RoleForCreationDto): Observable<void>{
    return this.http.post<void>(`${environment.serverUrl}/api/admin/roles`, roleDto)
  }

  getRoleById(id: string): Observable<Role>{
    return this.http.get<Role>(`${environment.serverUrl}/api/admin/roles/${id}`)
  }

  deleteRole(id: string): Observable<void>{
    return this.http.delete<void>(`${environment.serverUrl}/api/admin/roles/${id}`)
  }
  getRoleByName(name: string): Observable<Role>{
    return this.http.get<Role>(`${environment.serverUrl}/api/admin/roles/name?name=${name}`)
  }

  getRolePermissions(roleName: string) : Observable<Permission[]>{
    return this.http.get<Permission[]>(`${environment.serverUrl}/api/admin/roles/${roleName}/permissions`)
  }
  
  updateRolePermissions(roleName: string, permissions: PermissionForRole[]): Observable<void>{
    return this.http.put<void>(`${environment.serverUrl}/api/admin/roles/${roleName}/permissions`, permissions)
  }

  addRolePermissions(roleName: string, permissions: PermissionForRole[]): Observable<void>{
    return this.http.post<void>(`${environment.serverUrl}/api/admin/roles/${roleName}/permissions`, permissions)
  }




}
