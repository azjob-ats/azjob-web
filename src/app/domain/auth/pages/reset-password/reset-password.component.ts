import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@domain/auth/components/footer/footer.component';
import { HeaderComponent } from '@domain/auth/components/header/header.component';
import { PayloadToken } from '@domain/auth/interfaces/index.interface';
import { BaseAuthModel } from '@domain/auth/models/base-auth.model';
import { ApiResponse } from '@shared/interfaces/api-response';
import { InputEmailComponent } from '@widget/components/input-email/input-email.component';
import { InputPasswordComponent } from '@widget/components/input-passworld/input-passworld.component';
import { InputPinComponent } from '@widget/components/input-pin/input-pin.component';
import { LoadingSpinnerDirective } from '@widget/directives/loading-spinner.directive';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';
import { StepperModule } from 'primeng/stepper';

@Component({
  selector: 'app-reset-password',
  imports: [
    RouterModule,
    ButtonModule,
    InputOtpModule,
    InputEmailComponent,
    FooterComponent,
    HeaderComponent,
    InputPasswordComponent,
    StepperModule,
    LoadingSpinnerDirective,
    InputPinComponent,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent extends BaseAuthModel {
  public activeStep: number = 1;
  public isLoadingSendCodeToEmail: boolean = false;
  public isLoadingResetPassword: boolean = false;
  private payload!: { token: string; expiresIn: string };

  public sendCodeToEmail(): void {
    if (this.emailControl.status == 'INVALID') {
      this.emailControl.markAsTouched();
      return;
    }

    this.isLoadingSendCodeToEmail = true;

    this.authService.isEmailAlreadyExists(this.emailControl.value!).subscribe({
      next: (res: ApiResponse<PayloadToken>) => {
        this.isLoadingSendCodeToEmail = false;
        if (this.emailControl.status == 'VALID') {
          this.emailControl.markAsTouched();
          this.activeStep = 2;
          this.payload = {
            token: res.data!.token,
            expiresIn: res.data!.expiresIn,
          };
          return;
        }
      },
      error: (err: ApiResponse) => {
        if (err.errors!.code === 'auth/wrong-email') {
          this.emailOption.hasErrorResponse = err.errors!.message;
          this.emailControl.setErrors({ hasErrorResponse: true });
        }
        this.isLoadingSendCodeToEmail = false;
      },
    });
  }

  public resetPassword(): void {
    if (this.passwordControl.status == 'VALID') {
      this.pinControl.markAsTouched();

      this.isLoadingResetPassword = true;
      this.authService
        .updatePasswordByToken(
          this.emailControl.value!,
          this.payload.token,
          this.passwordControl.value!
        )
        .subscribe({
          next: () => {
            this.router.navigate([this.signInRouterLink]);
          },
          error: (err: ApiResponse) => {
            if (err.errors!.code === 'auth/wrong-pin-expired') {
              this.pinOption.hasErrorResponse = err.errors!.message;
              this.passwordControl.setErrors({ hasErrorResponse: true });
            }
            this.isLoadingResetPassword = false;
          },
        });
    }
  }

  private resetPayloadPin(): void {
    this.payload = {
      token: '',
      expiresIn: '',
    };
  }

  public validatePin(): void {
    if (this.pinControl.status == 'INVALID') {
      this.pinControl.markAsTouched();
      return;
    }

    this.resetPayloadPin();
    this.isLoadingValidatePin = true;

    this.authService.validatePin(this.pinControl.value!).subscribe({
      next: (res: ApiResponse<PayloadToken>) => {
        this.isLoadingValidatePin = false;
        if (this.pinControl.status == 'VALID') {
          this.pinControl.markAsTouched();
          this.activeStep = 3;
          this.payload = {
            token: res.data!.token,
            expiresIn: res.data!.expiresIn,
          };
          return;
        }
      },
      error: (err: ApiResponse) => {
        if (err.errors!.code === 'auth/wrong-pin') {
          this.pinOption.hasErrorResponse = err.errors!.message;
          this.pinControl.setErrors({ hasErrorResponse: true });
        }

        if (err.errors!.code === 'auth/wrong-pin-expired') {
          this.pinOption.hasErrorResponse = 'O código expirou, Volte para tentar um novo código.';
          this.pinControl.setErrors({ hasErrorResponse: true });
        }
        this.isLoadingValidatePin = false;
      },
    });
  }
}
