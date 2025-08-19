import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { Task } from '../../models/tasks';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  imports: [],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css'
})
export class TaskDetail implements OnInit {

  private taskService = inject(TaskService);
  private route = inject(ActivatedRoute)

  taskId: string | null;
  task!: Task;

  constructor(){
    this.taskId = this.route.snapshot.paramMap.get('id')
  }

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
