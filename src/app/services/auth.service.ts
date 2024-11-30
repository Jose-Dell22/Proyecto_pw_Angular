// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api';

    constructor(private http: HttpClient) { }

    login(credentials: { email: string; password: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/login`, credentials);
    }

    saveToken(token: string): void {
        localStorage.setItem('token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    logout(): void {
        // Eliminar el token de autenticación del almacenamiento local
        localStorage.removeItem('token');
        // Realizar cualquier otra limpieza necesaria
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    
}