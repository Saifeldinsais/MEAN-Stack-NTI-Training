import { Component, inject, signal } from '@angular/core';
import { TaskList } from './task-list/task-list';
import { Login } from './login/login';


@Component({
  selector: 'app-root',
  imports: [TaskList, Login],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
