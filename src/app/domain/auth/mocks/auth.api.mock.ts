import { Injectable } from "@angular/core";
import { ApiResponse } from "@shared/interfaces/api-response";
import { BehaviorSubject, delay, Observable, of, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthApiMockService {
    private user$!: BehaviorSubject<any[]>;

    private user: any[] = [
        { email: 'saulomcchelsom@gmail.com', senha: 'Senha!1', nome: 'Saulom', sobrenome: 'Mcchelsom', id: 1 },
    ];

    public constructor() {
        this.user$ = new BehaviorSubject(this.user);
    }

    public signInWithEmailAndPassword(email: string, password: string): Observable<ApiResponse> {
        const user = this.user$.value.find((user) => user.email === email && user.senha === password);
        if (user) {
            return of({
                success: true,
                message: 'Login realizado com sucesso',
                statusCode: 200,
                data: user,
                timestamp: new Date().toISOString()
            }).pipe(delay(2000));
        }

        const emailIsValid = this.user.find((user) => user.email === email);
        if (emailIsValid) {
            const response = {
                success: false,
                message: 'Erro de validação',
                statusCode: 400,
                errors: [
                    {
                        code: 'auth/wrong-password',
                        message: 'Senha inválidos',
                    }
                ],
                timestamp: new Date().toISOString()
            }
            return throwError(() => response).pipe(delay(2000));
        }

        const response = {
            success: false,
            message: 'Erro de validação',
            statusCode: 400,
            errors: [
                {
                    code: 'auth/wrong-email',
                    message: 'E-mail não encontrado',
                }
            ],
            timestamp: new Date().toISOString()
        }
        return throwError(() => response).pipe(delay(2000));

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