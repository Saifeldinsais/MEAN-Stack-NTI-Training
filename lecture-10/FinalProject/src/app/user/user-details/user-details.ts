import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { UserService } from '../../services/user-service';
import { UserModel } from '../../models/user-models';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-details.html',
  styleUrl: './user-details.css'
})
export class UserDetails implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);

  user!: UserModel;
  originalUser!: UserModel;
  isEditing: boolean = false;
  selectedFile: File | null = null;
  usernameError = false;

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsed = JSON.parse(userData);
      this.user = new UserModel(
        parsed.email,
        parsed.id,
        parsed._token,
        new Date(parsed.__expiresIn),
        parsed.name,
        parsed.username,
        parsed.photo
      );
      this.originalUser = new UserModel(
        parsed.email,
        parsed.id,
        parsed._token,
        new Date(parsed.__expiresIn),
        parsed.name,
        parsed.username,
        parsed.photo
      );
    }
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
    this.loadUser();
    this.selectedFile = null;
    this.usernameError = false;
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput?.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  submitEdit() {
    this.userService.updateUserDetails({
      name: this.user.name,
      username: this.user.username,
      photo: this.selectedFile!
    }).subscribe({
      next: (response) => {
        this.usernameError = false;

        const token = response.token;
        const updatedUser = response.data.user;

        const expirationDate = new Date(Date.now() + 3600 * 1000);
        const userModel = new UserModel(
          updatedUser.email,
          updatedUser._id,
          token,
          expirationDate,
          updatedUser.name,
          updatedUser.username,
          updatedUser.photo
        );

        this.authService.user.next(userModel);
        localStorage.setItem('userData', JSON.stringify(userModel));

        this.user = userModel;
        this.originalUser = new UserModel(
          updatedUser.email,
          updatedUser._id,
          token,
          expirationDate,
          updatedUser.name,
          updatedUser.username,
          updatedUser.photo
        );
        this.isEditing = false;

        alert("User profile updated.");
      },

      error: (err) => {
        if (err.message?.includes('username')) {
          this.usernameError = true;
        } else {
          alert("Update failed.");
        }
      }
    });
  }
}
