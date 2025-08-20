import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  selectedFileName: string =""
  selectedFile: File | null = null;
  passwordMisMatch: boolean = false;
  error: string = ""

  private authService = inject(AuthService)
  private router = inject(Router)

  @ViewChild("signupForm") signupForm !: NgForm

  onSubmit(){
    console.log("signup workingggg");
    if (this.signupForm.invalid) {
      return
    }

    const {name, password, confirmPassword, email, username} = this.signupForm.value;
    
    if (password !== confirmPassword) {
      this.passwordMisMatch = true;
      return
    }

    const fd = new FormData();
    fd.append("name", name)
    fd.append("username", username)
    fd.append("email", email)
    fd.append("password", password)
    if (this.selectedFile) {
      
      console.log(this.selectedFile);
      
      fd.append("photo", this.selectedFile)
    }
    
    this.authService.signup(fd).subscribe({
      next: (user)=>{
        console.log(user);
        this.signupForm.reset();
        this.selectedFile = null;
        this.selectedFileName = ""
        this.router.navigate(['user'])
      }, error: (err)=>{
        console.log(err)
        this.error = err.message;
      }

    })
  }

  onFileSelected(e: Event){
    const input = e.target as HTMLInputElement
    
    this.selectedFile = input.files?.[0] || null;
    this.selectedFileName = this.selectedFile?.name || "";

  }
}
