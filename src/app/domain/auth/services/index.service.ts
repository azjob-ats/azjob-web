import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '@shared/interfaces/api-response';
import { BehaviorSubject, delay, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { TokenCacheService } from '../caches/token.cache';
import { UserCacheService } from '../caches/user.cache';
import { UserRegisterWithEmailAndPassword } from '../interfaces/index.interface';
import { AuthApiMockService } from '../mocks/auth.api.mock';

@Injectable({ providedIn: 'root' })
export class IndexService {
  private user$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private token$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private userValue$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private tokenCache: TokenCacheService = inject(TokenCacheService);
  private userCache: UserCacheService = inject(UserCacheService);
  private api: AuthApiMockService = inject(AuthApiMockService);

  public signInWithGoogle() {}

  public signInWithEmailAndPassword(email: string, password: string): Observable<ApiResponse> {
    return this.api.signInWithEmailAndPassword(email, password).pipe(
      tap(res => {
        if (res.success) {
          this.setToken(res.data);
        }
      }),
      switchMap((res: any) =>
        res.success
          ? this.api.getCurrentUserById(res.data.refresh_token.user_id).pipe(
              tap(user => this.setUser(user)),
              map(() => res)
            )
          : of(res)
      )
    );
  }

  public isEmailAlreadyExists(email: string): Observable<ApiResponse> {
    return this.api.isEmailAlreadyExists(email);
  }

  public validatePin(pin: string) {
    return this.api.validatePin(pin);
  }

  public updatePasswordByToken(email: string, code: string, newPassword: string) {
    return this.api.updatePasswordByToken(email, code, newPassword);
  }

  public signUpWithEmailAndPassword(user: UserRegisterWithEmailAndPassword) {
    return this.api.signUpWithEmailAndPassword(user);
  }

  public confirmEmailByCode(code: string, email: string) {
    return this.api.confirmEmailByCode(code, email).pipe(
      switchMap(response => {
        if (response.success) {
        }
        return of(response);
      })
    );
  }

  public logout(): Observable<boolean> {
    this.api.logout(this.userValue$.value.id);
    this.userCache.delete();
    this.tokenCache.delete();
    this.user$.next(null);
    this.userValue$.next(null);
    this.token$.next(null);

    return of(true).pipe(delay(500));
  }

  public isLogged(): Observable<boolean> {
    const token = this.token$.value;

    if (token) {
      return of(true);
    }

    return this.validateToken().pipe(
      switchMap(res => {
        if (res) {
          return of(true);
        }

        return of(false);
      })
    );
  }

  private setUser(user: any) {
    this.userCache.delete();
    this.user$.next(user);
    this.userValue$.next(user);
    this.userCache.save(user);
  }

  private setToken(data: any) {
    this.tokenCache.delete();
    this.token$.next(data);
    this.tokenCache.save(data);
  }

  public getCurrentUser(): Observable<any> {
    return this.validateToken().pipe(
      switchMap(res => {
        if (!res) {
          return of({});
        }
        // 1 - Verifica memória local
        const userInMemory = this.userValue$.value;

        if (userInMemory) {
          return of(userInMemory);
        }

        return this.userCache.results().pipe(
          switchMap((cachedUser: any) => {
            // 2 - Verifica no cache
            if (cachedUser && cachedUser.length > 0) {
              this.user$.next(cachedUser[0]);
              this.userValue$.next(cachedUser[0]);
              return of(cachedUser[0]);
            }

            // 3 - Busca da API
            const userId = this.token$.value?.refresh_token.user_id;
            return this.api.getCurrentUserById(userId).pipe(
              tap(user => {
                this.setUser(user); // Atualiza cache em memória
              })
            );
          })
        );
      })
    );
  }

  public getToken(): Observable<any> {
    const token = this.token$.value;

    if (token) {
      return of(token);
    }

    return this.validateToken().pipe(
      switchMap(res => {
        if (res) {
          return this.token$.asObservable();
        }

        return of({});
      })
    );
  }

  public validateToken(): Observable<boolean> {
    return this.tokenCache.results().pipe(
      take(1),
      switchMap((token: any) => {
        if (token && token.length > 0) {
          if (new Date() >= new Date(token[0].refresh_token.expiresIn)) {
            this.tokenCache.delete();
            this.userCache.delete();
            return of(false);
          }
          this.token$.next(token[0]);
          return of(true);
        }
        return of(false);
      })
    );
  }
}
