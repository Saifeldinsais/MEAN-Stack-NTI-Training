import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { exhaustMap, map, Observable, take } from 'rxjs';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private url = 'http://localhost:5000/users'


  addTaskToList(taskId: string): Observable<string[]> {

    return this.authService.user.pipe(
      take(1), exhaustMap((user) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${user?.token}`,

        });
        return this.http.post<any>(`${this.url}/addTasks`, { taskId }, { headers })
          .pipe(map((response) => {
            return response.data.listTasks
          }))
      }))
  }

  updateTaskById(taskId: string, updatedtask: any): Observable<string[]> {
    return this.authService.user.pipe(
      take(1), exhaustMap((user) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${user?.token}`
        });
        return this.http.patch<any>(
          `${this.url}/tasks/updateUserTask/${taskId}`, updatedtask, { headers })
          .pipe(map((response) => {
            return response.data.task
          }))
      }))
  }

  deleteTaskByID(taskId: string): Observable<string[]>{
    return this.authService.user.pipe(
      take(1), 
      exhaustMap((user) => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${user?.token }`});
        return this.http.delete<any>(
          `${this.url}/tasks/deleteTask/${taskId}`, { headers })
          .pipe(map((response) => {
            return response.data.listTasks
          }))
      })
    )
  }
}
