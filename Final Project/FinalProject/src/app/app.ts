import { Component, signal } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  tasks = [
    { id: 1, name: 'Nti task 8', description: 'Angular intro', status: 'completed'},
    { id: 2, name: 'Racing team task', description: 'UART connection', status: 'In progress'},
    { id: 3, name: 'Final project', description: 'MEAN stack application', status: 'In progress'},
  ];

  // complete(taskId: number) {
  //   const task = this.tasks.find(task => task.id === taskId);
  //   if (task) {
  //     task.status = 'completed';
  //   }
  // }
}
