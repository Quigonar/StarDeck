import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoBackNavigationGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Get the current route index
    const currentIndex = parseInt(next.paramMap.get('index'));
    
    // Get the previous route index from the history state
    const previousIndex = window.history.state.navigationId - 1;

    // Check if the user is trying to navigate back to a previous route
    if (currentIndex <= previousIndex) {
      // Prevent navigation to previous route
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}