import { UserForAuthenticationDto, ServerAuthResponse } from './../interfaces';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService{

    get token(): string{
        const expDate = new Date(localStorage.getItem('jwt-exp'))
        if(new Date() > expDate){
            this.logout()
            return null
        }
        return localStorage.getItem('jwt')
    }

    get roles(){
      const expDate = new Date(localStorage.getItem('jwt-exp'))
        if(new Date() > expDate){
            this.logout()
            return null
        }
        return localStorage.getItem('jwt-roles')
    }
    constructor(private http: HttpClient) {}

    login(userForAuth: UserForAuthenticationDto): Observable<any>{
        return this.http.post(`${environment.serverUrl}/api/authentication/login`, userForAuth)
        .pipe(
            tap(this.setToken),
            catchError(this.handleError.bind(this))
        )
    }

    logout(){
        this.setToken(null)
    }

    isAuthenticated(): boolean{
        return !!this.token
    }

    private setToken(response: ServerAuthResponse){
        if(!response){
            localStorage.clear()
            return
        }
        const token = response.token
        const expDate = new Date(Date.now() +  response.minutesExpires * 1000 * 60)
        const roles = response.roles
        localStorage.setItem("jwt", token)
        localStorage.setItem("jwt-exp", expDate.toString())
        localStorage.setItem("jwt-roles", roles)
    }

    private handleError(error: HttpErrorResponse){
        //console.log('From handle error authservice:', error.error)
        return throwError(error)
    }

}

