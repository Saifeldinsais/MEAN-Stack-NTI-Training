import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { Task } from '../../models/tasks';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css'
})
export class TaskDetail implements OnInit {

  private taskService = inject(TaskService);
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  taskId: string | null;
  task!: Task;
  originaltask!: Task;
  isEditing: boolean = false;

  constructor() {
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

  toggleEdit() {
    if (this.isEditing) {
      this.cancelEdit();
    } else {
      this.isEditing = true;
    }
  }


  cancelEdit() {
    this.isEditing = false;
    this.loadTask();
  }

  submitEdit() {
    if (!this.taskId) return;

    const updatedTask: Partial<Task> = {
      title: this.task.title,
      description: this.task.description,
      priority: this.task.priority,
      dueDate: this.task.dueDate,
      status: this.task.status,
      comments: this.task.comments
    };

    this.taskService.updateTask(this.taskId, updatedTask).subscribe({
      next: (updated) => {
        this.task = updated;
        this.isEditing = false;
        console.log("Task updated successfully")
        this.loadTask();
      },
      error: (err) => {
        console.error('Error updating task:', err)
      }
    });
  }

  deleteTask() {
    if (!this.taskId) return;

    const confirmDelete = confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      this.taskService.deleteTask(this.taskId).subscribe({
        next: () => {
          this.router.navigate(['/user/tasklist'])
        },
        error: (err) => {
          console.error('Error deleting task:', err)
        }
      });
    }
  }

}
