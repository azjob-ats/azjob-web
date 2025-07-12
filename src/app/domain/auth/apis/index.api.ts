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
  public signInWithEmailAndPassword(_email: string, _password: string): Observable<ApiResponse> {
    throw new Error('Method not implemented.');
  }
  public isEmailAlreadyExists(_email: string): Observable<ApiResponse> {
    throw new Error('Method not implemented.');
  }
  public validatePin(_pin: string): Observable<ApiResponse> {
    throw new Error('Method not implemented.');
  }
  public updatePasswordByToken(
    _email: string,
    _code: string,
    _newPassword: string
  ): Observable<ApiResponse> {
    throw new Error('Method not implemented.');
  }
  public signUpWithEmailAndPassword(
    _user: UserRegisterWithEmailAndPassword
  ): Observable<ApiResponse> {
    throw new Error('Method not implemented.');
  }
  public confirmEmailByCode(_code: string, _email: string): Observable<ApiResponse> {
    throw new Error('Method not implemented.');
  }
  public logout(_idUser: number): void {
    throw new Error('Method not implemented.');
  }
  public getCurrentUserById(_idUser: number): Observable<ApiResponse> {
    throw new Error('Method not implemented.');
  }
}
