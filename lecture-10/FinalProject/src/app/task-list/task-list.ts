import { Component, inject, OnInit } from '@angular/core';
import { Task } from '../models/tasks';
import { TaskService } from '../services/task-service';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList implements OnInit{
  tasks: Task[] = []

  private taskService = inject(TaskService);

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        console.log(data);
      }
    })
  }

  addTask() {
    const newTask: Task = {
      // id: this.tasks.length + 1,
      title: "ahmed mohamed",
      description: "Description of new task",
      priority: "Medium",
      dueDate: "1/10/2025",
      status: "Pending",
      comments: "No comments yet"
    };

    this.taskService.addTask(newTask).subscribe({
      next: (data) => {
        console.log('Task added successfully:', data);
        this.tasks.push(data);
      }
    })
  }

  // updateTask(id: number = 1) {
  //   this.taskService.updateTask(id, { status: "In Progress" }).subscribe({
  //     next: (data) => {
  //       this.tasks = data;
  //       console.log('Task updated successfully:', id);
  //     }
  //   })
  // }

  // deleteTask(id : number = 2){
  //   this.taskService.deleteTask(id).subscribe({
  //     next: (data) => {
  //       this.tasks = data;
  //       console.log('Task deleted successfully:', id);
  //     },
  //     error: (err) => {
  //       console.error('Error deleting task:', err);
  //     }
  //   })
  // }
}

