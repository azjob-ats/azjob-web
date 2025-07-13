import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '@shared/interfaces/api-response';
import { BehaviorSubject, delay, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { TokenCacheService } from '../caches/token.cache';
import { UserCacheService } from '../caches/user.cache';
import {
  PayloadToken,
  User,
  UserRegisterWithEmailAndPassword,
  UserToken,
} from '../interfaces/index.interface';
import { AuthApiMockService } from '../mocks/auth.api.mock';

@Injectable({ providedIn: 'root' })
export class IndexService {
  private user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private token$: BehaviorSubject<UserToken | null> = new BehaviorSubject<UserToken | null>(null);
  private userValue$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private tokenCache: TokenCacheService = inject(TokenCacheService);
  private userCache: UserCacheService = inject(UserCacheService);
  private api: AuthApiMockService = inject(AuthApiMockService);

  public signInWithGoogle(): void {}

  public signInWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<ApiResponse<UserToken>> {
    return this.api.signInWithEmailAndPassword(email, password).pipe(
      tap(res => {
        if (res.success) {
          this.setToken(res.data!);
        }
      }),
      switchMap((res: ApiResponse<UserToken>) =>
        res.success
          ? this.api.getCurrentUserById(res.data!.refreshToken.userId).pipe(
              tap(user => this.setUser(user.data!)),
              map(() => res)
            )
          : of(res)
      )
    );
  }

  public isEmailAlreadyExists(email: string): Observable<ApiResponse<PayloadToken>> {
    return this.api.isEmailAlreadyExists(email);
  }

  public validatePin(pin: string): Observable<ApiResponse<PayloadToken>> {
    return this.api.validatePin(pin);
  }

  public updatePasswordByToken(
    email: string,
    code: string,
    newPassword: string
  ): Observable<ApiResponse<boolean>> {
    return this.api.updatePasswordByToken(email, code, newPassword);
  }

  public signUpWithEmailAndPassword(
    user: UserRegisterWithEmailAndPassword
  ): Observable<ApiResponse<UserToken>> {
    return this.api.signUpWithEmailAndPassword(user);
  }

  public confirmEmailByCode(code: string, email: string): Observable<ApiResponse<UserToken>> {
    return this.api.confirmEmailByCode(code, email).pipe(
      switchMap(response => {
        if (response.success) {
        }
        return of(response);
      })
    );
  }

  public logout(): Observable<boolean> {
    this.api.logout(this.userValue$.value!.id);
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

  private setUser(user: User): void {
    this.userCache.delete();
    this.user$.next(user);
    this.userValue$.next(user);
    this.userCache.save(user);
  }

  private setToken(data: UserToken): void {
    this.tokenCache.delete();
    this.token$.next(data);
    this.tokenCache.save(data);
  }

  public getCurrentUser(): Observable<User | null> {
    return this.validateToken().pipe(
      switchMap(res => {
        if (!res) {
          return of(null);
        }
        // 1 - Verifica memória local
        const userInMemory = this.userValue$.value;

        if (userInMemory) {
          return of(userInMemory);
        }

        return this.userCache.results().pipe(
          switchMap((cachedUser: User[]) => {
            // 2 - Verifica no cache
            if (cachedUser && cachedUser.length > 0) {
              this.user$.next(cachedUser[0]);
              this.userValue$.next(cachedUser[0]);
              return of(cachedUser[0]);
            }

            // 3 - Busca da API
            const userId = this.token$.value?.refreshToken.userId;
            return this.api.getCurrentUserById(userId!).pipe(
              tap(user => {
                this.setUser(user.data!); // Atualiza cache em memória
              }),
              map(res => res.data as User)
            );
          })
        );
      })
    );
  }

  public getToken(): Observable<UserToken | null> {
    const token = this.token$.value;

    if (token) {
      return of(token);
    }

    return this.validateToken().pipe(
      switchMap(res => {
        if (res) {
          return this.token$.asObservable();
        }

        return of(null);
      })
    );
  }

  public validateToken(): Observable<boolean> {
    return this.tokenCache.results().pipe(
      take(1),
      switchMap((token: UserToken[]) => {
        if (token && token.length > 0) {
          if (new Date() >= new Date(token[0].refreshToken.expiresIn)) {
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
