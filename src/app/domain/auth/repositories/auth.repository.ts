import { Observable } from 'rxjs';
import {
  PayloadToken,
  User,
  UserRegisterWithEmailAndPassword,
  UserToken,
} from '@domain/auth/interfaces/index.interface';
import { ApiResponse } from '@shared/interfaces/api-response';

export abstract class AuthRepository {
  public abstract signInWithGoogle(): Observable<ApiResponse>;

  public abstract signInWithEmailAndPassword(email: string, password: string): Observable<ApiResponse<UserToken>>;

  public abstract signUpWithEmailAndPassword(user: UserRegisterWithEmailAndPassword): Observable<ApiResponse<UserToken>>;

  public abstract sendCodePinByEmailForUpdatePassword(email: string): Observable<ApiResponse<PayloadToken>>;

  public abstract validatePinSendByEmailForConfirmTheAccount(pin: string, email: string): Observable<ApiResponse<UserToken>>;

  public abstract validatePinForUpdatePassword(pin: string, email: string): Observable<ApiResponse<PayloadToken>>;

  public abstract updatePasswordByToken(email: string, token: string, newPassword: string): Observable<ApiResponse<boolean>>;

  public abstract getCurrentUserById(idUser: number): Observable<ApiResponse<User>>;

  public abstract logout(idUser: number): void;
}
