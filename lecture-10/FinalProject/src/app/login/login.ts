import { Component, inject, ViewChild, viewChild } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { UserService } from '../services/user-service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private authService = inject(AuthService)
  private userService = inject(UserService);

  // errorMessage: string = '';
  // isError: boolean = false;


  // onLogin(email: string = 'sais@gmail.com', username: string = 'sais', password: string = '12345678') {
  //   this.authService.login(email, username, password).subscribe({
      // next: (token) => {
      //   console.log(token);
      // },
      // error: (error) => {
      //   console.log(error)
      // }
  //   })
  // }

//   addTaskToList() {
//   const newTask = {
//     title: 'New Task Title',
//     description: 'Some description',
//     priority: 'High',
//     status: 'Completed',
//     comments: 'First task creation'
//   };

//   this.userService.addTaskToList(newTask).subscribe({
//     next: (data) => console.log('Task list updated:', data),
//     error: (error) => console.error('Error adding task:', error)
//   });
// }

//   updateTaskById(
//     taskId: string = '689a3f65906f236995e8aef4',
//     updatedData: any = { title: 'Updated Task Title', status: 'completed' }
//   ) {
//     this.userService.updateTaskById(taskId, updatedData).subscribe({
//       next: (updatedTask) => {
//         console.log('Task updated successfully:', updatedTask);
//       },
//       error: (error) => {
//         console.error('Error updating task:', error);
//       }
//     });
//   }

//   deleteTaskByID(taskId: string = '689a3f65906f236995e8aef4') {
//     this.userService.deleteTaskByID(taskId).subscribe({
//       next: (data) => {
//         console.log('Task deleted successfully, list of current tasks: ', data);

//       },
//       error: (error) => {
//         console.log('error deleting the task:', error)
//       }
//     })
//   }

// ___________________________________________________________________________________
// ___________________________________________________________________________________
// ___________________________________________________________________________________
// ___________________________________________________________________________________
// ___________________________________________________________________________________


  @ViewChild("loginForm") loginForm !: NgForm;

  formData: any = {}

  onSubmit(){
    console.log(this.loginForm);
    console.log(this.loginForm.value);
    
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: (token) => {
        console.log(token);
        console.log("tokennnnn")
      },
      error: (error) => {
        console.log(error)
      }
    })
    this.formData = {...this.loginForm.value}
    this.loginForm.reset();
    console.log("submit button working");

  }

  // setForm(){
  //   this.jobForm.form.setValue({
  //     fullName: 'saif',
  //     position : 'student',
  //     email: 'saif@gmail.com',
  //     phone: '0123456789',
  //     linkedIn: 'ay 7aga',
  //     startDate: '2000/01/01',
  //     employment: 'full-time',
  //     address: {
  //       street1: 'street',
  //       street2: '',
  //       city: 'cairo',
  //       country: 'egypt',
  //       state: 'cairo',
  //       postalCode: '1234'
  //     },

  //     textarea: 'hello'

  //   })
  //   console.log("workingggg")
  // }

  // patchForm(){}

}
