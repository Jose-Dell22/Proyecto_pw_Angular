import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {
    private selectedRole = new BehaviorSubject<string>('');

    setSelectedRole(role: string) {
        this.selectedRole.next(role);
    }

    getSelectedRole() {
        return this.selectedRole.asObservable();
    }
}