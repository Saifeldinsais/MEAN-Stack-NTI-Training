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
  

  // getUserDetails(): Observable<User>{

  // }

  // updateUserDetails(): Observable<User>{

  // }

  // resetPassword(): Observable<User>{

  // }

}
