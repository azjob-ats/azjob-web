import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { catchError, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private router: Router = inject(Router);
  private isAuth: any;

  public canActivate(): Observable<boolean> {
    return this.isAuth
      .isAuthenticated()
      .pipe(
        switchMap(() => {
          return of(true);
        })
      )
      .pipe(
        catchError(() => {
          this.router.navigate(['/auth/sign-in']);
          return of(false);
        })
      );
  }
}
