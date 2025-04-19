import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-home',
  imports:[CommonModule,ReactiveFormsModule,NgModel],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router, private authService: AuthService) {}

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout error:', err);
      }
    });
  }

  goToUpload(): void {
    this.router.navigate(['/upload']);
  }

  viewRecipes(): void {
    this.router.navigate(['/recipes']);
  }
}
