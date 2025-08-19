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

  private url = 'http://localhost:5000/users/';

  user = new BehaviorSubject<UserModel | null>(null)


  signup(newUser: any) {
    return this.http.post<any>(`${this.url}signup`, newUser).pipe(
      map((response) => {
        if (response.token) {
          const decoded = jwtDecode<any>(response.token);
          const expirationDate = new Date(decoded.exp * 1000);
          const loggedInUser = new UserModel(
            decoded.email,
            decoded.id,
            response.token,
            expirationDate,
          response.data.user.name,
          response.data.user.username,
          response.data.user.photo
          );
          this.user.next(loggedInUser);
          localStorage.setItem('userData', JSON.stringify(loggedInUser));

          return response.data.user;
        } else {
          throw new Error('Token not found in response');
        }
      }),
      catchError(this.handleError)
    );
  }


  login(email: string, password: string) {
    console.log("authservice reached");
    console.log(email, password);


    return this.http.post<any>(`${this.url}login`, { email, password }).pipe(
      map((response) => {
        if (response.token) {
          const decoded = jwtDecode<any>(response.token);
          const expirationDate = new Date(decoded.exp * 1000);

          const loggedInUser = new UserModel(
            decoded.email,
            decoded.id,
            response.token,
            expirationDate,
            response.data.user.name,
            response.data.user.username,
            response.data.user.photo
          );

          this.user.next(loggedInUser);
          localStorage.setItem("userData", JSON.stringify(loggedInUser));

          return response.data.user;
        } else {
          throw new Error("Token not found in response");
        }
      }),
      catchError(this.handleError)
    );
  };


  private handleError(error: any) {
    let errorResponse = { status: 'fail', message: `unknown error: ${error.error.message} ` }

    if (error.error && error.error.status && error.error.message) {
      errorResponse = {
        status: error.error.status,
        message: error.error.message,
      }
    }

    return throwError(() => errorResponse)
  }


  autoLogin() {
    const userDataString = localStorage.getItem("userData")
    if (!userDataString) {
      return;
    }

    const userData = JSON.parse(userDataString);
    const u = new UserModel(userData.email, userData.id, userData._token, new Date(userData.__expiresIn), userData.name, userData.username, userData.photo)

    if (u.token) {
      this.user.next(u);
    }
  }


  logOut() {
    this.user.next(null)
    localStorage.removeItem("userData")
  }
}
