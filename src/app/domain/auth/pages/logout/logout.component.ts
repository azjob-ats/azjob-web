import { Component } from '@angular/core';
import { BaseAuthModel } from '@domain/auth/models/base-auth.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-logout',
  standalone: true,
  template: `
    <div
      class="flex flex-column align-items-center justify-content-center h-screen text-center gap-4"
    >
      <i class="pi pi-sign-out text-6xl text-primary"></i>
      <h2>Você saiu com sucesso</h2>
      <p>Redirecionando para a tela de home...</p>
    </div>
  `,
  styles: [],
})
export class LogoutComponent extends BaseAuthModel {
  ngOnInit(): void {
    this.authService
      .logout()
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate([this.rootRouterLink]);
      });
  }
}
