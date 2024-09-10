import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,authservice:AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const isAuthenticated = this.isAuthenticated();
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
    }
    return isAuthenticated;
  }
  
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return !this.isTokenExpired(token);
    }
    return false;
  }

  private isTokenExpired(token: string): boolean {
    try {
      const expiryTimeString = localStorage.getItem("expiryTime");
      console.log(expiryTimeString);
      console.log(Date.now())
      if (!expiryTimeString) {
        return true; // Si le temps d'expiration n'est pas défini, considérez-le comme expiré
      }
  
      const expiryTime = parseInt(expiryTimeString); // Convertir la chaîne en nombre
  
      return Date.now() >= expiryTime;
    } catch (error) {
      console.error("Error checking token expiry:", error);
      return true; // En cas d'erreur, considérez le jeton comme expiré par défaut
    }
  }
}
