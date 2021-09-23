import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Permission } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(private http: HttpClient) { }

  getPermissions(): Observable<Permission[]>{
    return this.http.get<Permission[]>(`${environment.serverUrl}/api/admin/permissions`)
  }

}
