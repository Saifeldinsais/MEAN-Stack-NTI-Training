import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { Task } from '../../models/tasks';

@Component({
  selector: 'app-task-detail',
  imports: [],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css'
})
export class TaskDetail implements OnInit {

  private taskService = inject(TaskService);

  taskId!: string;
  task!: Task;


  ngOnInit(): void {
    this.loadTask();
  }

  loadTask() {
    this.taskService.getTaskByid(this.taskId).subscribe({
      next: (data) => {
        this.task = data;
      },
      error: (err) => {
        console.error('Error loading task:', err);
      }
    });
  }

  
}
