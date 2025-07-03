export abstract class AuthModel {

    abstract signInWithEmailAndPassword(email: string, password: string): any;

    abstract signInWithGoogle(): any;

    abstract signUpWithEmailAndPassword(email: string, password: string): any;

    abstract getUser(): any;

    abstract getUserToken(): any;

    abstract isLogged(): any;

    abstract logout(): any;

    abstract sendEmailResetPassword(passwordResetEmail: string): any;

    abstract confirmEmailByCode(code: string, email: string): any;

    abstract resendCodeToEmail(email: string): any;

    abstract informEmailToPasswordReset(email: string): any;

    abstract updatePassword(email: string, code: string, newPassword: string): any;
}
