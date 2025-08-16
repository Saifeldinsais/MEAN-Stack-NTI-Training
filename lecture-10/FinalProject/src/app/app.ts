import { Component, inject, OnInit, signal } from '@angular/core';
import { TaskList } from './task-list/task-list';
import { Login } from './login/login';
import { AuthService } from './services/auth-service';
import { Signup } from './signup/signup';


@Component({
  selector: 'app-root',
  imports: [TaskList, Login, Signup],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  private authService = inject(AuthService)

  ngOnInit(){
    this.authService.autoLogin()
  }
}
