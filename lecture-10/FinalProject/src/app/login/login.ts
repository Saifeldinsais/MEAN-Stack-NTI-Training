import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private authService = inject(AuthService)
  private userService = inject(UserService);

  errorMessage: string = '';
  isError: boolean = false;
  onLogin(email: string = 'sais@gmail.com', username: string = 'sais', password: string = '12345678') {
    this.authService.login(email, username, password).subscribe({
      next: (token) => {
        console.log(token);
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  addTaskToList(taskId: string = '689a3f65906f236995e8aef4') {
    this.userService.addTaskToList(taskId).subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  updateTaskById(
    taskId: string = '689a3f65906f236995e8aef4',
    updatedData: any = { title: 'Updated Task Title', status: 'completed' }
  ) {
    this.userService.updateTaskById(taskId, updatedData).subscribe({
      next: (updatedTask) => {
        console.log('Task updated successfully:', updatedTask);
      },
      error: (error) => {
        console.error('Error updating task:', error);
      }
    });
  }

  deleteTaskByID( taskId: string = '689a3f65906f236995e8aef4'){
    this.userService.deleteTaskByID(taskId).subscribe({
      next: (data) => {
        console.log('Task deleted successfully, list of current tasks: ', data);
        
      }, 
      error: (error) => {
        console.log('error deleting the task:', error)
      }
    })
  }

}
