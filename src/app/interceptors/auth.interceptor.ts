// src/app/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

// auth.interceptor.ts
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();
        console.log('URL being called:', request.url);
        console.log('Token being used:', token);

        if (token) {
            const cloned = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Final headers:', cloned.headers.get('Authorization'));
            return next.handle(cloned);
        }
        return next.handle(request);
    }
}