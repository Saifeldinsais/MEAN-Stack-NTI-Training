import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { exhaustMap, map, Observable, take } from 'rxjs';
import { AuthService } from './auth-service';
//import { User } from '../models/user-models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private url = 'http://localhost:5000/users'


  // ask why did we create the user as a class and why does using observable get an error

  // getUserDetails(): Observable<User>{

  // }

  // updateUserDetails(): Observable<User>{

  // }

  // resetPassword(): Observable<User>{

  // }

}
