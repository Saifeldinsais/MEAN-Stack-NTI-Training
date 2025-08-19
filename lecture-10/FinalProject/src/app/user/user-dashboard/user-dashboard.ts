import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  imports: [],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css'
})
export class UserDashboard {

  private router = inject(Router)

  navigateToTaskForm(){
    this.router.navigate(['user', 'taskform'])
  }
}
