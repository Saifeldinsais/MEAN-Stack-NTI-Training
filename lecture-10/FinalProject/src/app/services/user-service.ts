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



  getUserDetails(): Observable<any> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${user?.token}` });
        return this.http.get(`${this.url}/me`, { headers });
      })
    );
  }

  updateUserDetails(updatedData: {name?: string, email?: string, username?: string, photo?: File }): Observable<any> {
    const formData = new FormData();
    if (updatedData.name) formData.append('name', updatedData.name);
    if (updatedData.email) formData.append('email', updatedData.email);
    if (updatedData.username) formData.append('username', updatedData.username);
    if (updatedData.photo) formData.append('photo', updatedData.photo);

    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${user?.token}` });
        return this.http.patch(`${this.url}/updateUser`, formData, { headers });
      })
    );
  }


  resetPassword(currentPassword: string, newPassword: string, newPasswordConfirm: string): Observable<any> {
    const body = { currentPassword, newPassword, newPasswordConfirm };

    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${user?.token}` });
        return this.http.patch(`${this.url}/reset-password`, body, { headers });
      })
    );
  }

}
