import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { User } from './../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.baseURL;
  private user?: User;

  constructor(private httpClient: HttpClient, private router: Router) { }
  
  get currentUser() : User | undefined {
    if (!this.user) return undefined    
    return {...this.user} // return structuredClone(this.user)
  }

  login(email: string, pswd:string):Observable<User>{ //Si se hace login, el observable regresa un usuario
    return this.httpClient.get<User>(`${this.url}/users/1`)
      .pipe(
        tap( user => this.user = user),
        tap(user => localStorage.setItem('token', 'user.id.toString()'))
      )
  }

  checkAuth(): Observable<boolean>{
    if (!localStorage.getItem('token')) return of(false)

    const token = localStorage.getItem('token')

    return this.httpClient.get<User>(`${this.url}/users/1`)
      .pipe(
        tap( user => this.user = user),
        map( user => !!user),
        catchError(err => of(false))
      )
  }
  

  logOut(){
    this.user = undefined;
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  
}
