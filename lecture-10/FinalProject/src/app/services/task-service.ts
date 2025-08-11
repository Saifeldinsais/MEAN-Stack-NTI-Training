import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Task } from '../models/tasks';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  private URL = 'http://localhost:5000/tasks';

  getTasks(): Observable<Task[]> {
    return this.http.get<any>(this.URL).pipe(map((response) =>
      response.data.task));
  }

  addTask(task: Task): Observable<Task>{
  
    return this.http.post<any>(this.URL, task).pipe(map((response) => response.data.task));
  }
}
