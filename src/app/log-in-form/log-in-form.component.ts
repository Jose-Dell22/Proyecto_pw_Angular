// src/app/log-in-form/log-in-form.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { RegisterRequest, RegisterResponse, LoginResponse } from '../../models/auth.model';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-log-in-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NavbarComponent
  ],
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.css']
})
export class LogInFormComponent implements OnInit {
  registerData: RegisterRequest = {
    name: '',
    email: '',
    password: '',
    role: '',
    projectIds: []  // Agrega el campo projectId
  };
  errorMessage: string = '';
  isLoading: boolean = false;
  projectIdsInput: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private registrationService: RegistrationService
  ) { }

  ngOnInit(): void {
    this.registrationService.getSelectedRole().subscribe(role => {

      if (role) {
        this.registerData.role = role;
      } else {
        this.router.navigate(['/About_us']);
      }
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (!this.registerData.role) {
      this.errorMessage = 'Please select a subscription plan and project(s) first';
      return;
    }
    
    this.registerData.projectIds = this.projectIdsInput.split(',').map(Number);

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register(this.registerData).subscribe({
      next: (_: RegisterResponse) => {
        // Auto login después del registro
        this.authService.login({
          email: this.registerData.email,
          password: this.registerData.password
        }).subscribe({
          next: (loginResponse: LoginResponse) => {
            this.authService.saveToken(loginResponse.token);
            this.router.navigate(['/Projects']);
          },
          error: (error) => {
            this.errorMessage = 'Login failed after registration';
            this.isLoading = false;
          }
        });
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Registration failed';
        this.isLoading = false;
      }
    });
  }
}