// src/app/about_us/about-us.component.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Importa RouterModule
import { RegistrationService } from '../services/registration.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterModule, 
    CommonModule  
  ],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private registrationService: RegistrationService
  ) { }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  selectPlan(role: string): void {
    if ((role === 'ROLE_ADMIN' || role === 'ROLE_WORKER') && !this.isAdmin()) {
      this.showErrorMessage('You do not have permission to select this plan. Please contact your administrator.');
      return;
    }

    this.registrationService.setSelectedRole(role);
    this.router.navigate(['/log-in-form']);
  }

  private showErrorMessage(message: string): void {
    alert(message);
  }
}