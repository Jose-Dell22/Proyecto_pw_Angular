// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
        private messageService: MessageService
    ) { }

    canActivate(): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        }

        this.messageService.showMessage('Please login to access your projects');
        this.router.navigate(['/Log_in']);
        return false;
    }
}