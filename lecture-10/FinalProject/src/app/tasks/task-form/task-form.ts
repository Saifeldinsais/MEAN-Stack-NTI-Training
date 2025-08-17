import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskService } from '../../services/task-service';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm {
  selectedFileName: string =""
  selectedFile: File | null = null;

  private taskService = inject(TaskService)

  @ViewChild("newTaskForm") newTaskForm !: NgForm

  onSubmit(){
    console.log("submit of the new task workingggg")

    if (this.newTaskForm.invalid) {
      return
    }

    const {title, description, priority, dueDate, status, comments} = this.newTaskForm.value;

    const fd = new FormData();
    fd.append("title", title)
    fd.append("description", description)
    fd.append("priority", priority)
    fd.append("dueDate", dueDate)
    fd.append("status", status)
    fd.append("comments", comments)
    if (this.selectedFile) {
      fd.append("photo", this.selectedFile)
    }

    this.taskService.addTask(fd).subscribe({
      next: (data) => {
        console.log(data);
        this.newTaskForm.reset();
        this.selectedFile = null;
        this.selectedFileName = ""
      }, error: (err)=>{
        console.log("Error adding the task", err)
      }
    })


  }

  onFileSelected(e: Event){
    const input = e.target as HTMLInputElement
    
    this.selectedFile = input.files?.[0] || null;
    this.selectedFileName = this.selectedFile?.name || "";

  }
}
