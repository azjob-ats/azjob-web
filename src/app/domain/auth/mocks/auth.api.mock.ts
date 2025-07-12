import { Injectable } from '@angular/core';
import { ApiResponse } from '@shared/interfaces/api-response';
import { BehaviorSubject, delay, Observable, of, throwError } from 'rxjs';
import { eProvider, eRole } from '../enums/index.enum';
import { UserRegisterWithEmailAndPassword } from '../interfaces/index.interface';
import { AuthRepository } from '../repositories/auth.repository';

@Injectable({ providedIn: 'root' })
export class AuthApiMockService implements AuthRepository {
  private access_token: string =
    '.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  private refresh_token: string = '3f5e2fc4-bbc2-4f85-b73a-b112f3f447ae';
  private user$!: BehaviorSubject<any[]>;
  private pin: string[] = ['1263'];
  private payload!: { token: string; expiresIn: string };

  public constructor() {
    const user: UserRegisterWithEmailAndPassword = {
      email: 'saulomcchelsom@gmail.com',
      password: 'Senha!1',
      name: 'Saulo',
      role: eRole.USER,
      providers: eProvider.AZJOB,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    const newUser = {
      id: 1,
      ...user,
      lastname: '',
      phone: '',
      birthdate: null,
      gender: null,
      address: null,
      city: '',
      state: '',
      country: '',
      zipcode: '',
      avatar: 'image/user-default.png',
      bio: null,
      username: this.generateUsernameFromEmail(user.email),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
      isActive: true,
      isAdmin: false,
      isVerified: true,
      isBlocked: false,
      isDeleted: false,
      isLoggedIn: false,
    };

    this.user$ = new BehaviorSubject([newUser]);
  }

  public signInWithGoogle() {
    return of();
  }

  public signInWithEmailAndPassword(email: string, password: string): Observable<ApiResponse> {
    const user = this.user$.value.find(user => user.email === email && user.password === password);

    if (user) {
      const emailNotVerified = user.isVerified == false;
      if (emailNotVerified) {
        const response = {
          success: false,
          message: 'E-mail não verificado',
          statusCode: 400,
          errors: [
            {
              code: 'auth/wrong-email-not-verified',
              message: 'E-mail não verificado',
            },
          ],
          timestamp: new Date().toISOString(),
        };
        return throwError(() => response).pipe(delay(500));
      }
    }

    if (user) {
      const token = {
        access_token: this.access_token,
        refresh_token: {
          token: this.refresh_token,
          timestamp: new Date().toISOString(),
          expiresIn: new Date(Date.now() + 30 * 60000).toISOString(),
          user_id: user.id,
        },
      };

      user.isLoggedIn = true;
      this.updateUser(user);

      return of({
        success: true,
        message: 'Login realizado com sucesso',
        statusCode: 200,
        data: token,
        timestamp: new Date().toISOString(),
      }).pipe(delay(500));
    }

    const emailIsValid = this.user$.value.find(user => user.email === email);
    if (emailIsValid) {
      const response = {
        success: false,
        message: 'Erro de validação',
        statusCode: 400,
        errors: [
          {
            code: 'auth/wrong-password',
            message: 'Senha não confere',
          },
        ],
        timestamp: new Date().toISOString(),
      };
      return throwError(() => response).pipe(delay(500));
    }

    const response = {
      success: false,
      message: 'Erro de validação',
      statusCode: 400,
      errors: [
        {
          code: 'auth/wrong-email',
          message: 'E-mail não encontrado',
        },
      ],
      timestamp: new Date().toISOString(),
    };
    return throwError(() => response).pipe(delay(500));
  }

  public signUpWithEmailAndPassword(user: UserRegisterWithEmailAndPassword) {
    const findEmail = this.user$.value.find(find => find.email === user.email);

    if (findEmail) {
      const response = {
        success: false,
        message: 'Email já existe',
        statusCode: 404,
        errors: [
          {
            code: 'auth/wrong-email-exists',
            message: 'E-mail já existe',
          },
        ],
        timestamp: new Date().toISOString(),
      };
      return throwError(() => response).pipe(delay(2000));
    }

    const newUser = {
      id: this.user$.value.length + 1,
      ...user,
      phone: '',
      birthdate: null,
      gender: null,
      address: null,
      city: '',
      state: '',
      country: '',
      zipcode: '',
      avatar: 'image/user-default.png',
      bio: null,
      username: this.generateUsernameFromEmail(user.email),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
      isActive: true,
      isAdmin: false,
      isVerified: false,
      isBlocked: false,
      isDeleted: false,
      isLoggedIn: false,
    };

    this.user$ = new BehaviorSubject([...this.user$.value, newUser]);

    const token = {
      access_token: this.access_token,
      refresh_token: {
        token: this.refresh_token,
        timestamp: new Date().toISOString(),
        expiresIn: new Date(Date.now() + 5 * 60000).toISOString(),
        user_id: newUser.id,
      },
    };

    return of({
      success: true,
      message: 'Usuário criado com sucesso',
      statusCode: 200,
      data: token,
      timestamp: new Date().toISOString(),
    }).pipe(delay(2000));
  }

  public isEmailAlreadyExists(email: string): Observable<ApiResponse> {
    const findEmail = this.user$.value.find(user => user.email === email);
    this.payload = {
      token: '3f5e2fc4-ccbb-4f85-b73a-b112f3f447ae',
      expiresIn: new Date(Date.now() + 5 * 60000).toISOString(),
    };

    if (findEmail) {
      return of({
        success: true,
        message: 'E-mail existe',
        statusCode: 200,
        data: this.payload,
        timestamp: new Date().toISOString(),
      }).pipe(delay(100));
    }

    const response = {
      success: false,
      message: 'Email não existe',
      statusCode: 404,
      errors: [
        {
          code: 'auth/wrong-email',
          message: 'E-mail não encontrado',
        },
      ],
      timestamp: new Date().toISOString(),
    };
    return throwError(() => response).pipe(delay(2000));
  }

  public validatePin(pin: string): Observable<ApiResponse> {
    const datePayload = new Date(this.payload.expiresIn);
    const tokenExpires = datePayload < new Date();
    if (tokenExpires) {
      const response = {
        success: false,
        message: 'PIN expirado',
        statusCode: 400,
        errors: [
          {
            code: 'auth/wrong-pin-expired',
            message: 'PIN expirado',
          },
        ],
        timestamp: new Date().toISOString(),
      };

      return throwError(() => response).pipe(delay(2000));
    }

    const findPin = this.pin.includes(pin);

    if (findPin) {
      return of({
        success: true,
        message: 'Código válido',
        statusCode: 200,
        data: this.payload,
        timestamp: new Date().toISOString(),
      }).pipe(delay(2000));
    }

    const response = {
      success: false,
      message: 'Código inválido',
      statusCode: 404,
      errors: [
        {
          code: 'auth/wrong-pin',
          message: 'O código expirou, Volte para tentar um novo código.',
        },
      ],
      timestamp: new Date().toISOString(),
    };

    return throwError(() => response).pipe(delay(2000));
  }

  public confirmEmailByCode(pin: string, email: string) {
    const findEmail = this.user$.value.find(user => user.email === email);

    if (!findEmail) {
      const response = {
        success: false,
        message: 'Email não existe',
        statusCode: 404,
        errors: [
          {
            code: 'auth/wrong-email',
            message: 'E-mail não encontrado',
          },
        ],
        timestamp: new Date().toISOString(),
      };
      return throwError(() => response).pipe(delay(2000));
    }

    const findPin = this.pin.includes(pin);

    if (findPin == false) {
      const response = {
        success: false,
        message: 'Código inválido',
        statusCode: 404,
        errors: [
          {
            code: 'auth/wrong-pin-not-found',
            message:
              'PIN Não confere com o enviado para o email, verifique o email e tente novamente.',
          },
        ],
        timestamp: new Date().toISOString(),
      };

      return throwError(() => response).pipe(delay(2000));
    }

    const users = [...this.user$.value];
    const index = users.findIndex(user => user.email === email);

    if (index !== -1) {
      users[index] = { ...users[index], isVerified: true };
      this.user$.next(users);
    }

    const token = {
      access_token: this.access_token,
      refresh_token: {
        token: this.refresh_token,
        timestamp: new Date().toISOString(),
        expiresIn: new Date(Date.now() + 5 * 60000).toISOString(),
        user_id: users[index].id,
      },
    };

    return of({
      success: true,
      message: 'Código confirmado com sucesso',
      statusCode: 200,
      data: token,
      timestamp: new Date().toISOString(),
    }).pipe(delay(2000));
  }

  public updatePasswordByToken(email: string, token: string, newPassword: string) {
    const datePayload = new Date(this.payload.expiresIn);
    const payloadExpires = datePayload < new Date();
    if (payloadExpires) {
      const response = {
        success: false,
        message: 'PIN expirado',
        statusCode: 400,
        errors: [
          {
            code: 'auth/wrong-pin-expired',
            message: 'PIN expirado',
          },
        ],
        timestamp: new Date().toISOString(),
      };

      return throwError(() => response).pipe(delay(2000));
    }

    const users = [...this.user$.value];
    const index = users.findIndex(user => user.email === email);

    if (index !== -1) {
      users[index] = { ...users[index], password: newPassword };
      this.user$.next(users);
    }

    return of({
      success: true,
      message: 'password updated',
      statusCode: 200,
      data: [],
      timestamp: new Date().toISOString(),
    }).pipe(delay(2000));
  }

  public getCurrentUserById(idUser: number): Observable<any> {
    const user = this.user$.value.find(user => user.id === idUser);
    return of(user).pipe(delay(2000));
  }

  public logout(idUser: number) {
    const user = this.user$.value.find(user => user.id === idUser);
    user.isLoggedIn = false;
    this.updateUser(user);
  }

  private updateUser(user: any) {
    const index = this.user$.value.findIndex(user => user.id === user.id);
    this.user$.value[index] = user;
    this.user$.next(this.user$.value);
  }

  private generateUsernameFromEmail(email: string): string {
    const prefix = email.split('@')[0];
    const randomNumbers = Math.floor(100000 + Math.random() * 900000);
    return `${prefix}${randomNumbers}`;
  }
}
