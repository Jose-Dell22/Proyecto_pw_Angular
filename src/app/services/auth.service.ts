// src/app/services/auth.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequest, RegisterResponse, LoginResponse } from '../../models/auth.model';
import { isPlatformBrowser } from '@angular/common';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api';
    private isBrowser: boolean;

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) platformId: object
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    register(registerData: RegisterRequest): Observable<RegisterResponse> {
        return this.http.post<RegisterResponse>(`${this.apiUrl}/auth/register`, registerData);
    }

    login(credentials: { email: string; password: string }): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
            tap(response => {
                console.log('Respuesta completa del login:', response);
                console.log('Token recibido:', response.token);
                console.log('Roles recibidos:', response.roles);
                this.saveToken(response.token);
                if (response.roles && response.roles.length > 0) {
                    this.saveRole(response.roles[0]);
                }
            })
        );
    }

    

    saveToken(token: string): void {
        if (this.isBrowser) {
            localStorage.setItem('token', token);
        }
    }

    saveRole(role: string): void {
        if (this.isBrowser) {
            localStorage.setItem('userRole', role);
        }
    }

    getToken(): string | null {
        if (this.isBrowser) {
            const token = localStorage.getItem('token');
            console.log('Obteniendo token del localStorage:', token);
            return token;
        }
        return null;
    }

    getRole(): string | null {
        if (this.isBrowser) {
            return localStorage.getItem('userRole');
        }
        return null;
    }

    logout(): void {
        if (this.isBrowser) {
            localStorage.removeItem('token');
            localStorage.removeItem('userRole');
        }
    }

    isLoggedIn(): boolean {
        if (this.isBrowser) {
            return !!this.getToken();
        }
        return false;
    }

    hasRole(roleToCheck: string): boolean {
        const userRole = this.getRole();
        console.log('Role actual:', userRole);
        console.log('Buscando rol:', roleToCheck);
        // Comparamos strings individuales
        return userRole === roleToCheck;
    }

    isAdmin(): boolean {
        return this.hasRole('ROLE_ADMIN');
    }

}