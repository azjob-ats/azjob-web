import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@domain/auth/components/footer/footer.component';
import { HeaderComponent } from '@domain/auth/components/header/header.component';
import { BaseAuthModel } from '@domain/auth/models/base-auth.model';
import { ApiResponse } from '@shared/interfaces/api-response';
import { InputEmailComponent } from '@widget/components/input-email/input-email.component';
import { InputPasswordComponent } from '@widget/components/input-passworld/input-passworld.component';
import { LoadingSpinnerDirective } from '@widget/directives/loading-spinner.directive';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sign-in',
  imports: [
    RouterModule,
    ButtonModule,
    HeaderComponent,
    FooterComponent,
    InputEmailComponent,
    InputPasswordComponent,
    LoadingSpinnerDirective,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent extends BaseAuthModel {
  public override validarForm() {
    if (this.emailControl.status == 'INVALID') {
      this.emailControl.markAsTouched();
      return;
    }

    if (this.passwordControl.status == 'INVALID') {
      this.passwordControl.markAsTouched();
      return;
    }

    this.passwordControl.disable();
    this.emailControl.disable();
    this.passwordOption.isDisabled = true;
    this.emailOption.isDisabled = true;

    this.isDisabled = true;
    this.isLoading = true;

    this.signIn(this.emailControl.value!, this.passwordControl.value!).subscribe({
      next: (res: ApiResponse<any>) => {
        this.isLoading = false;
        this.isDisabled = false;
        this.passwordControl.enable();
        this.emailControl.enable();
        this.passwordOption.isDisabled = false;
        this.emailOption.isDisabled = false;

        if (res.statusCode === 200) {
          this.router.navigate([this.rootRouterLink]);
          return;
        }
      },
      error: err => {
        this.isLoading = false;
        this.isDisabled = false;
        this.passwordControl.enable();
        this.emailControl.enable();
        this.passwordOption.isDisabled = false;
        this.emailOption.isDisabled = false;

        if (err.errors![0].code === 'auth/wrong-password') {
          this.passwordOption.hasErrorResponse = err.errors![0].message;
          this.passwordControl.setErrors({ hasErrorResponse: true });
        }

        if (err.errors![0].code === 'auth/wrong-email') {
          this.emailOption.hasErrorResponse = err.errors![0].message;
          this.emailControl.setErrors({ hasErrorResponse: true });
        }

        if (err.errors![0].code === 'auth/wrong-email-not-verified') {
          this.router.navigate([this.confirmSignUpRouterLink], {
            queryParams: { email: this.emailControl.value },
          });
        }
      },
    });
  }

  public signIn(email: string, password: string) {
    return this.authService.signInWithEmailAndPassword(email, password);
  }
}
