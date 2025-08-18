import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task-service';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm {

  addTaskForm!: FormGroup;
  selectedFile: File | null = null;
  selectedFileName: string = '';

  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);

  constructor() {
    this.addTaskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['Medium'],
      dueDate: [''],
      status: ['Not started'],
      comments: [''],
      imageurl: [null]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] || null;
    this.selectedFileName = this.selectedFile?.name || '';
  }

  onSubmit(): void {
    if (this.addTaskForm.invalid) {
      this.addTaskForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('title', this.addTaskForm.get('title')?.value);
    formData.append('description', this.addTaskForm.get('description')?.value || '');
    formData.append('priority', this.addTaskForm.get('priority')?.value);
    formData.append('dueDate', this.addTaskForm.get('dueDate')?.value || '');
    formData.append('status', this.addTaskForm.get('status')?.value);
    formData.append('comments', this.addTaskForm.get('comments')?.value || '');

    if (this.selectedFile) {
      formData.append('taskPhoto', this.selectedFile);
    }

    this.taskService.addTask(formData).subscribe({
      next: (response) => {
        console.log('Task added:', response);
        this.addTaskForm.reset({
          priority: 'Medium',
          status: 'Not started'
        });
        this.selectedFile = null;
        this.selectedFileName = '';
      },
      error: (error) => {
        console.error('Error adding task:', error);
      }
    });
  }
}


  // selectedFileName: string =""
  // selectedFile: File | null = null;

  // private taskService = inject(TaskService)

  // @ViewChild("newTaskForm") newTaskForm !: NgForm

  // onSubmit(){
  //   console.log("submit of the new task workingggg")

  //   if (this.newTaskForm.invalid) {
  //     return
  //   }

  //   const {title, description, priority, dueDate, status, comments} = this.newTaskForm.value;

  //   const fd = new FormData();
  //   fd.append("title", title)
  //   fd.append("description", description)
  //   fd.append("priority", priority)
  //   fd.append("dueDate", dueDate)
  //   fd.append("status", status)
  //   fd.append("comments", comments)
  //   if (this.selectedFile) {
  //     fd.append("photo", this.selectedFile)
  //   }

  //   this.taskService.addTask(fd).subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       this.newTaskForm.reset();
  //       this.selectedFile = null;
  //       this.selectedFileName = ""
  //     }, error: (err)=>{
  //       console.log("Error adding the task", err)
  //     }
  //   })


  // }

  // onFileSelected(e: Event){
  //   const input = e.target as HTMLInputElement
    
  //   this.selectedFile = input.files?.[0] || null;
  //   this.selectedFileName = this.selectedFile?.name || "";

  // }