import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { of, throwError } from 'rxjs';

describe('AuthGuard (Jest)', () => {
  let guard: AuthGuard;
  let router: Router;
  let mockAuthService: { isAuthenticated: jest.Mock };

  beforeEach(() => {
    mockAuthService = {
      isAuthenticated: jest.fn(),
    };

    const routerMock = {
      navigate: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: Router, useValue: routerMock }],
    });

    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);

    // Atribuir mock manualmente porque `isAuth` não é injetado com Angular DI
    (guard as any).isAuth = mockAuthService;
  });

  it('deve permitir acesso quando autenticado', done => {
    mockAuthService.isAuthenticated.mockReturnValue(of(true));

    guard.canActivate().subscribe(result => {
      expect(result).toBe(true);
      expect(router.navigate).not.toHaveBeenCalled();
      done();
    });
  });

  it('deve bloquear acesso e redirecionar quando não autenticado', done => {
    mockAuthService.isAuthenticated.mockReturnValue(throwError(() => new Error('Não autenticado')));

    guard.canActivate().subscribe(result => {
      expect(result).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/auth/sign-in']);
      done();
    });
  });
});
