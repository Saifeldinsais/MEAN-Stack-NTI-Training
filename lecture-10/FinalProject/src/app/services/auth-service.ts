import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { UserModel } from '../models/user-models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)

  private url = 'http://localhost:5000/users/login';

  user = new BehaviorSubject<UserModel | null>(null)

  login(email: string, username: string, password: string) {
    return this.http.post<any>(this.url, { email, username, password }).pipe(map((response) => {
      if(response.token){
        const decoded = jwtDecode<any>(response.token);
        const expirationDate = new Date(decoded.exp *1000);
        
        const loggedUser = new UserModel(decoded.email, 
          decoded.id, 
          response.token, 
          expirationDate)

        this.user.next(loggedUser);
        return response.data.user;
        
      }else{
        throw new Error("Token not found in response");
      }
    }),
      catchError(this.handleError)
    )
  };


  private handleError(error: any) {
    let errorResponse = { status: 'fail', message: 'unknown error' }

    if (error.error && error.error.status && error.error.message) {
      errorResponse = {
        status: error.error.status,
        message: error.error.message,
      }
    }

    return throwError(()=> errorResponse)
  }
}
