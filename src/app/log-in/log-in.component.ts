import { Component, OnDestroy } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { MessageService } from '../services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, NavbarComponent],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnDestroy {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  isLoggedIn: boolean = false;
  private messageSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.messageSubscription = this.messageService.message$.subscribe(message => {
      if (message) {
        this.errorMessage = message;
      }
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (!this.username || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login({
      email: this.username,
      password: this.password
    }).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.isLoggedIn = true;
        this.router.navigate(['/Projects']);
      },
      error: (error) => {
        this.errorMessage = 'Invalid credentials. Please try again.';
        this.password = '';
        setTimeout(() => {
          this.isLoading = false;
        }, 0);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}