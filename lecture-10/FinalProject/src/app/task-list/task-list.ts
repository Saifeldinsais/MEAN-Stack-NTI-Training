import { Component, inject, OnInit } from '@angular/core';
import { Task } from '../models/tasks';
import { TaskService } from '../services/task-service';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList implements OnInit {
  tasks: Task[] = []

  private taskService = inject(TaskService);

  ngOnInit(): void {
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
      title: "TASKKKKKKK",
      description: "ay 7aga",
      priority: "Medium",
      coverImage: "asurt.png",
      status: "Not started",
      comments: "ay task"
    };

    this.taskService.addTask(newTask).subscribe({
      next: (data) => {
        this.tasks.push(data);
        console.log('Task added successfully:', data);
      },
      error: (err) => {
        console.error('Error adding task:', err); // Add this to see backend error message
      }
    })
  }

  updateTask(id: string | undefined, index: number) {
    this.taskService.updateTask(id, { status: 'Completed' }).subscribe({
      next: (data) => {
        this.tasks[index] = data;
        console.log('Task updated successfully:', data);
      }})
  }

  deleteTask(id: string | undefined, index: number) {
       this.taskService.deleteTask(id).subscribe({
         next: (data) => {
            this.tasks.splice(this.tasks.findIndex(task => task._id === id), 1);
           console.log('Task updated successfully:', data);
         }})
    console.log('Task deleted successfully:', id);
  }
}

