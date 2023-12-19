import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SessionGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    switch (state.url) {
      case '/': {
        if (this.hasActiveSession()) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }
      default:
        if (!this.hasActiveSession()) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
    }
  }

  private hasActiveSession(): boolean {
    return this.authService.getToken() ? true : false;
  }
}
