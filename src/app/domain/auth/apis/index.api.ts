import { Injectable } from '@angular/core';

import { ApiResponse } from '@shared/interfaces/api-response';
import { Observable } from 'rxjs';
import { UserRegisterWithEmailAndPassword } from '../interfaces/index.interface';
import { AuthRepository } from '../repositories/auth.repository';

@Injectable({ providedIn: 'root' })
export class ApiService implements AuthRepository {
  public signInWithGoogle(): Observable<ApiResponse> {
    throw new Error('Method not implemented.');
  }
  public signInWithEmailAndPassword(email: string, password: string): Observable<ApiResponse> {
    throw new Error('Method not implemented.');
  }
  public isEmailAlreadyExists(email: string): Observable<ApiResponse> {
    throw new Error('Method not implemented.');
  }
  public validatePin(pin: string): Observable<any> {
    throw new Error('Method not implemented.');
  }
  public updatePasswordByToken(email: string, code: string, newPassword: string): Observable<any> {
    throw new Error('Method not implemented.');
  }
  public signUpWithEmailAndPassword(user: UserRegisterWithEmailAndPassword): Observable<any> {
    throw new Error('Method not implemented.');
  }
  public confirmEmailByCode(code: string, email: string): Observable<any> {
    throw new Error('Method not implemented.');
  }
  public logout(idUser: number): void {
    throw new Error('Method not implemented.');
  }
  public getCurrentUserById(idUser: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
