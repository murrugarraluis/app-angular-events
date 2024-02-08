import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate(): boolean {
        const token = localStorage.getItem('token');

        if (token) {
            return true; // Permite la navegación si hay un token en el almacenamiento local
        } else {
            this.router.navigate(['/auth/login']); // Redirecciona a la ruta de inicio de sesión si no hay token
            return false;
        }
    }
}
