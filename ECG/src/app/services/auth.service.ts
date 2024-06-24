import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;

  login() {
    // Lógica de inicio de sesión
    this.isAuthenticated = true;
  }

  logout() {
    // Lógica de cierre de sesión
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
