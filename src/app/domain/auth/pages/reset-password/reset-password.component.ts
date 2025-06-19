import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputPrimaryComponent } from
  '@widget/components/input-primary/input-primary.component';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';

@Component({
  selector: 'app-reset-password',
  imports: [
    RouterModule,
    ButtonModule,
    InputOtpModule,
    FormsModule,
    ReactiveFormsModule,
    InputPrimaryComponent
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  protected sidebarLogoRouterLink = '/'
  protected signUpRouterLink = '/auth/panel-sign-in'
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