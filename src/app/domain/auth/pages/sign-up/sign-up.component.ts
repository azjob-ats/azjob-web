import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputPrimaryComponent } from '@widget/components/input-primary/input-primary.component';
import { ButtonModule } from 'primeng/button';
import { environment } from '@env/environment';
import { HeaderComponent } from '@domain/auth/components/header/header.component';
import { FooterComponent } from '@domain/auth/components/footer/footer.component';
const { ROUTES } = environment;

@Component({
  selector: 'app-sign-up',
  imports: [
    InputPrimaryComponent,
    RouterModule,
    ButtonModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  protected signInRouterLink = `/${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.PANEL_SIGN_IN}`;
  protected signUpRouterLink = `/${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.SIGN_UP}`;
  protected confirmSignUpRouterLink = `/${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.CONFIRM_EMAIL}`;
  public emailFormControl = new FormControl('');
  public nomeFormControl = new FormControl('');
  public senhaFormControl = new FormControl('');
  public nomeFormOption = {
    title: 'Nome',
    erroFill: 'O nome deve ter no mínimo 5 caracteres.',
    erroRequired: 'nome é obrigatório.',
    minLength: 5,
    isRequired: true,
    isDisabled: false,
    maxLength: 100
  }
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
  ngOnInit(): void { }

}
