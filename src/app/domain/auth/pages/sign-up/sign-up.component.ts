import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@domain/auth/components/footer/footer.component';
import { HeaderComponent } from '@domain/auth/components/header/header.component';
import { eProvider, eRole } from '@domain/auth/enums/index.enum';
import { UserRegisterWithEmailAndPassword } from '@domain/auth/interfaces/index.interface';
import { BaseAuthModel } from '@domain/auth/models/base-auth.model';
import { ApiResponse } from '@shared/interfaces/api-response';
import { InputEmailComponent } from '@widget/components/input-email/input-email.component';
import { InputPasswordComponent } from '@widget/components/input-passworld/input-passworld.component';
import { InputPrimaryComponent } from '@widget/components/input-primary/input-primary.component';
import { LoadingSpinnerDirective } from '@widget/directives/loading-spinner.directive';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sign-up',
  imports: [
    InputPrimaryComponent,
    RouterModule,
    ButtonModule,
    HeaderComponent,
    FooterComponent,
    InputPasswordComponent,
    InputEmailComponent,
    LoadingSpinnerDirective,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent extends BaseAuthModel {
  public override validarForm() {
    if (this.nameControl.status == 'INVALID') {
      this.nameControl.markAsTouched();
      return;
    }

    if (this.emailControl.status == 'INVALID') {
      this.emailControl.markAsTouched();
      return;
    }

    if (this.passwordControl.status == 'INVALID') {
      this.passwordControl.markAsTouched();
      return;
    }

    if (this.confirmPasswordControl.status == 'INVALID') {
      this.confirmPasswordControl.markAsTouched();
      return;
    }

    this.nameControl.disable();
    this.emailControl.disable();
    this.passwordControl.disable();
    this.confirmPasswordControl.disable();
    this.nameOption.isDisabled = true;
    this.passwordOption.isDisabled = true;
    this.emailOption.isDisabled = true;
    this.isDisabled = true;
    this.isLoading = true;

    this.signUp({
      email: this.emailControl.value!,
      name: this.nameControl.value!,
      password: this.passwordControl.value!,
      providers: eProvider.AZJOB,
      role: eRole.USER,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }).subscribe({
      next: (res: ApiResponse<any>) => {
        this.isLoading = false;
        this.isDisabled = false;
        this.nameControl.enable();
        this.emailControl.enable();
        this.passwordControl.enable();
        this.confirmPasswordControl.enable();
        this.nameOption.isDisabled = false;
        this.passwordOption.isDisabled = false;
        this.emailOption.isDisabled = false;

        if (res.statusCode === 200) {
          this.router.navigate([this.confirmSignUpRouterLink], {
            queryParams: { email: this.emailControl.value },
          });
          return;
        }
      },
      error: err => {
        this.isLoading = false;
        this.isDisabled = false;
        this.nameControl.enable();
        this.emailControl.enable();
        this.passwordControl.enable();
        this.confirmPasswordControl.enable();
        this.nameOption.isDisabled = false;
        this.passwordOption.isDisabled = false;
        this.emailOption.isDisabled = false;

        if (err.errors![0].code === 'auth/wrong-email-exists') {
          this.emailOption.hasErrorResponse = err.errors![0].message;
          this.emailControl.setErrors({ hasErrorResponse: true });
        }
      },
    });
  }

  public signUp(user: UserRegisterWithEmailAndPassword) {
    return this.authService.signUpWithEmailAndPassword(user);
  }
}
