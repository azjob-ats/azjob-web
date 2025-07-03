import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IndexService } from '@domain/auth/services/index.service';
import { FooterComponent } from '@domain/auth/components/footer/footer.component';
import { HeaderComponent } from '@domain/auth/components/header/header.component';
import { InputEmailComponent } from '@widget/components/input-email/input-email.component';
import { InputPasswordComponent } from '@widget/components/input-passworld/input-passworld.component';
import { LoadingSpinnerDirective } from '@widget/directives/loading-spinner.directive';
import { ButtonModule } from 'primeng/button';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '@shared/interfaces/api-response';
const { ROUTES } = environment;

@Component({
  selector: 'app-sign-in',
  imports: [
    RouterModule,
    ButtonModule,
    HeaderComponent,
    FooterComponent,
    InputEmailComponent,
    InputPasswordComponent,
    LoadingSpinnerDirective
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  protected signUpRouterLink = `/${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.PANEL_SIGN_UP}`;
  protected signInRouterLink = `/${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.SIGN_IN}`;
  protected resetPasswordRouterLink = `/${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.RESET_PASSWORD}`;
  public emailControl = new FormControl('');
  public passwordControl = new FormControl('');
  public isDisabled = false;
  public isLoading = false;

  public emailOption = {
    title: 'E-mail',
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

  public ngOnInit(): void {

  }


  validarForm() {
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
          console.log(res);
          return;
        }
      },
      error: (err) => {
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
      }
    });
  }

  public signIn(email: string, password: string) {
    return this.authService.signInWithEmailAndPassword(email, password);
  }
}
