import { inject, Injectable } from '@angular/core';
import { exhaustMap, map, Observable, take } from 'rxjs';
import { Task } from '../models/tasks';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  private authService = inject(AuthService)
  private URL = 'http://localhost:5000/tasks';

  getTasks(): Observable<Task[]> {
    return this.authService.user.pipe(take(1),
      exhaustMap(user => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${user?.token}`
          //Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OTU1Y2M5Y2NlNTZhYWFkNzhjNjkzOCIsImVtYWlsIjoic2FpZnNhaXNAZ21haWwuY29tIiwiaWF0IjoxNzU1NTI4Njc2LCJleHAiOjE3NTYxMzM0NzZ9.KbW7nbUStdMTGdw05_FJCDMrYz-GNgxY95lFAqbYAYo`
        });
        return this.http.get<any>(this.URL, { headers })
          .pipe(map(response => response.data.tasks))
      })
    )
  }

  addTask(task: any): Observable<Task> {
    return this.authService.user.pipe(take(1),
      exhaustMap(user => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${user?.token}`
        });
        return this.http.post<any>(this.URL, task, { headers })
          .pipe(map(response => response.data.tasks))
      })
    )
  }

  updateTask(id: string | undefined, updatedTask: Partial<Task>): Observable<Task> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${user?.token}`
        });
        return this.http.patch<any>(`${this.URL}/${id}`, updatedTask, { headers })
          .pipe(map(response => response.data.task));
      })
    );
  }

  deleteTask(id: string | undefined): Observable<Task> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${user?.token}`
        });
        return this.http.delete<any>(`${this.URL}/${id}`, { headers })
          .pipe(map(response => response.data.tasks));
      })
    );
  }

  getTaskByid(id: string | null): Observable<Task>{
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${user?.token}`
          //Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OTU1Y2M5Y2NlNTZhYWFkNzhjNjkzOCIsImVtYWlsIjoic2FpZnNhaXNAZ21haWwuY29tIiwiaWF0IjoxNzU1NTI4Njc2LCJleHAiOjE3NTYxMzM0NzZ9.KbW7nbUStdMTGdw05_FJCDMrYz-GNgxY95lFAqbYAYo`
        });
        return this.http.get<any>(`${this.URL}/${id}`, { headers })
          .pipe(map(response => response.data.task));
      })
    );
  }
}
