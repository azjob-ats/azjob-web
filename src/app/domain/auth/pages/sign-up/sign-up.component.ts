import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputPrimaryComponent } from '@widget/components/input-primary/input-primary.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sign-up',
  imports: [
    InputPrimaryComponent,
    RouterModule,
    ButtonModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  protected sidebarLogoRouterLink = '/'
  protected signUpRouterLink = '/auth/panel-sign-up'
  protected confirmSignUpRouterLink = '/auth/confirm-email'
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
