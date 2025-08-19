import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule ,RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  isAuthenticated: boolean = false;

  private authService = inject(AuthService);
  private router = inject(Router)

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onLogout() {
    this.authService.logOut();
    this.router.navigate(['/home']);
  }

}
