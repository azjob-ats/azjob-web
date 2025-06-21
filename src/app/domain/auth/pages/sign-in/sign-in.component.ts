import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@domain/auth/components/footer/footer.component';
import { HeaderComponent } from '@domain/auth/components/header/header.component';
import { InputPrimaryComponent } from
  '@widget/components/input-primary/input-primary.component';
import { ButtonModule } from 'primeng/button';
import { environment } from 'src/environments/environment';
const { ROUTES } = environment;
@Component({
  selector: 'app-sign-in',
  imports: [
    InputPrimaryComponent,
    RouterModule,
    ButtonModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  protected signUpRouterLink = `/${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.PANEL_SIGN_UP}`;
  protected signInRouterLink = `/${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.SIGN_IN}`;
  protected resetPasswordRouterLink = `/${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.RESET_PASSWORD}`;
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
