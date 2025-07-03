import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@domain/auth/components/footer/footer.component';
import { HeaderComponent } from '@domain/auth/components/header/header.component';
import { IndexService } from '@domain/auth/services/index.service';
import { InputEmailComponent } from '@widget/components/input-email/input-email.component';
import { InputPasswordComponent } from '@widget/components/input-passworld/input-passworld.component';
import { PinCodeComponent } from '@widget/components/pin-code/pin-code.component';
import { LoadingSpinnerDirective } from '@widget/directives/loading-spinner.directive';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';
import { StepperModule } from 'primeng/stepper';
import { environment } from 'src/environments/environment';
const { ROUTES } = environment;

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
    PinCodeComponent,
    StepperModule,
    LoadingSpinnerDirective
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  protected signUpRouterLink = `/${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.PANEL_SIGN_UP}`;

  activeStep: number = 1;
  isLoadingValidatePin: boolean = false;
  isLoadingSendCodeToEmail: boolean = false;
  isLoadingResetPassword: boolean = false;

  public pin = new FormControl('');
  public emailControl = new FormControl('');
  public passwordControl = new FormControl('');

  public emailOption = {
    title: 'Informe seu e-mail para redefinir sua senha',
    erroFill: 'O e-mail deve ter no mínimo 5 caracteres.',
    erroRequired: 'e-mail é obrigatório.',
    minLength: 5,
    isRequired: true,
    isDisabled: false,
    maxLength: 100,
    hasErrorResponse: 'Hover um error'
  }

  public passwordOption = {
    title: 'Senha',
    erroFill: 'A senha deve ter no mínimo 5 caracteres.',
    erroRequired: 'senha é obrigatório.',
    minLength: 5,
    isRequired: true,
    isDisabled: false,
    maxLength: 100,
    hasErrorResponse: 'Hover um error'
  }

  constructor(private authService: IndexService) { }

  public ngOnInit(): void { }

  public sendCodeToEmail() {
    this.isLoadingSendCodeToEmail = true;
    setTimeout(() => {
      this.isLoadingSendCodeToEmail = false;
      if (this.emailControl.status == 'VALID') {
        this.emailControl.markAsTouched();
        console.log('email: ', this.emailControl.value);
        this.activeStep = 2;
        return;
      }
    }, 2000);
  }

  public resetPassword() {
    if (this.pin.status == 'VALID' && this.passwordControl.status == 'VALID') {
      this.pin.markAsTouched();
      console.log('pin: ', this.pin.value);
      console.log('senha: ', this.passwordControl.value);
      return;
    }
  }

  validatePin() {
    this.isLoadingValidatePin = true;
    setTimeout(() => {
      this.isLoadingValidatePin = false;
      if (this.pin.status == 'VALID') {
        this.pin.markAsTouched();
        console.log('pin: ', this.pin.value);
        this.activeStep = 3;
        return;
      }
    }, 2000);

  }

}