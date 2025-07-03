import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthApiMockService } from '../mocks/auth.api.mock';
import { ApiResponse } from '@shared/interfaces/api-response';

@Injectable({ providedIn: 'root' })
export class IndexService {
    private api: AuthApiMockService = inject(AuthApiMockService);

    public signInWithEmailAndPassword(email: string, password: string): Observable<ApiResponse> {
        return this.api.signInWithEmailAndPassword(email, password);
    }

    public signInWithGoogle() { }

    public signUpWithEmailAndPassword(email: string, password: string) { }

    public getUser() { }

    public getUserToken() { }

    public isLogged() { }

    public logout() { }

    public sendEmailResetPassword(passwordResetEmail: string) { }

    public confirmEmailByCode(code: string, email: string) { }

    public resendCodeToEmail(email: string) { }

    public informEmailToPasswordReset(email: string) { }

    public updatePassword(email: string, code: string, newPassword: string) { }

}
