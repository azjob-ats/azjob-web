import { Observable } from 'rxjs';
import { UserRegisterWithEmailAndPassword } from '../interfaces/index.interface';
import { ApiResponse } from '@shared/interfaces/api-response';

export abstract class AuthRepository {
  public abstract signInWithGoogle(): Observable<ApiResponse>;

  public abstract signInWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<ApiResponse>;

  public abstract signUpWithEmailAndPassword(
    user: UserRegisterWithEmailAndPassword
  ): Observable<ApiResponse>;

  public abstract isEmailAlreadyExists(email: string): Observable<ApiResponse>;

  public abstract validatePin(pin: string): Observable<ApiResponse>;

  public abstract confirmEmailByCode(pin: string, email: string): Observable<ApiResponse>;

  public abstract updatePasswordByToken(
    email: string,
    token: string,
    newPassword: string
  ): Observable<ApiResponse>;

  public abstract getCurrentUserById(idUser: number): Observable<any>;

  public abstract logout(idUser: number): void;
}
