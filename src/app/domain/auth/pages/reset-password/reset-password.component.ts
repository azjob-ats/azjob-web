import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputPrimaryComponent } from
  '@widget/components/input-primary/input-primary.component';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';
import { FooterComponent } from '@domain/auth/components/footer/footer.component';
import { HeaderComponent } from '@domain/auth/components/header/header.component';
import { environment } from 'src/environments/environment';
const { ROUTES } = environment;

@Component({
  selector: 'app-reset-password',
  imports: [
    RouterModule,
    ButtonModule,
    InputOtpModule,
    FormsModule,
    ReactiveFormsModule,
    InputPrimaryComponent,
    FooterComponent,
    HeaderComponent
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  protected signUpRouterLink = `/${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.PANEL_SIGN_UP}`;
  public pin = new FormControl('');
  public emailFormControl = new FormControl('');
  public senhaFormControl = new FormControl('');
  public emailFormOption = {
    title: 'E-mail',
    erroFill: 'O e-mail deve ter no mínimo 5 caracteres.',
    erroRequired: 'e-mail é obrigatório.',
    minLength: 5,
    isRequired: true,
    isDisabled: false,
    maxLength: 100
  }

  public senhaFormOption = {
    title: 'Senha',
    erroFill: 'A senha deve ter no mínimo 5 caracteres.',
    erroRequired: 'senha é obrigatório.',
    minLength: 5,
    isRequired: true,
    isDisabled: false,
    maxLength: 100
  }
}