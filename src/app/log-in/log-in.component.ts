import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa el CommonModule
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule], // Agrega el CommonModule a las importaciones
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(event: Event): void {
    event.preventDefault();

    this.isLoading = true;

    this.authService.login({
      email: this.username,
      password: this.password
    }).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.isLoggedIn = true;
        this.router.navigate(['/Projects']);
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Invalid credentials. Please try again.';
        document.getElementById('error-message')!.style.display = 'block';
        this.isLoading = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/Home']);
  }
}