import { Component, inject, OnInit, signal } from '@angular/core';
import { TaskList } from './tasks/task-list/task-list';
import { Login } from './login/login';
import { AuthService } from './services/auth-service';
import { Signup } from './signup/signup';
import { TaskDetail } from './tasks/task-detail/task-detail';
import { TaskForm } from './tasks/task-form/task-form';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [TaskList, Login, Signup, TaskDetail, TaskForm, Header, Footer, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  private authService = inject(AuthService)

  ngOnInit(){
    this.authService.autoLogin()
  }
}
