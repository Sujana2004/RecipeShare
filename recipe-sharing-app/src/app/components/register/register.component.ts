import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.username,this.email, this.password).subscribe({
      next: () => {
        // Navigate to login page after successful registration
        this.router.navigate(['/login']);
      },
      error: (error) => {
        // Handle error response
        this.errorMessage = error; // Display the error message
      }
    });
  }
}