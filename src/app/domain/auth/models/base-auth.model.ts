import { FormControl } from '@angular/forms';
import { IndexService } from '../services/index.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import {
  confirmSignUpRouterLink,
  panelSignInRouterLink,
  panelSignUpRouterLink,
  resetPasswordRouterLink,
  rootRouterLink,
  signInRouterLink,
  signUpRouterLink,
} from '@domain/auth/constants/routes.constant';

export class BaseAuthModel {
  public panelSignInRouterLink = panelSignInRouterLink;
  public confirmSignUpRouterLink = confirmSignUpRouterLink;
  public panelSignUpRouterLink = panelSignUpRouterLink;
  public resetPasswordRouterLink = resetPasswordRouterLink;
  public rootRouterLink = rootRouterLink;
  public signInRouterLink = signInRouterLink;
  public signUpRouterLink = signUpRouterLink;

  public isDisabled = false;
  public isLoading = false;
  public isLoadingValidatePin: boolean = false;
  public emailControl = new FormControl('');
  public nameControl = new FormControl('');
  public passwordControl = new FormControl('');
  public confirmPasswordControl = new FormControl('');
  public pinControl = new FormControl('');

  public nameOption = {
    title: 'Nome',
    erroFill: 'O nome deve ter no mínimo 5 caracteres.',
    erroRequired: 'nome é obrigatório.',
    minLength: 5,
    isRequired: true,
    isDisabled: false,
    maxLength: 100,
  };
  public emailOption = {
    title: 'E-mail',
    erroFill: 'O e-mail deve ter no mínimo 5 caracteres.',
    erroRequired: 'e-mail é obrigatório.',
    minLength: 5,
    isRequired: true,
    isDisabled: false,
    maxLength: 100,
    hasErrorResponse: 'Hover um error',
  };
  public passwordOption = {
    title: 'Senha',
    erroFill: 'A password deve ter no mínimo 5 caracteres.',
    erroRequired: 'password é obrigatório.',
    minLength: 5,
    isRequired: true,
    isDisabled: false,
    maxLength: 100,
    hasErrorResponse: 'Hover um error',
  };
  public pinOption = {
    erroRequired: 'Informe o código pin enviado para o seu e-mail.',
    hasErrorResponse: 'Hover um error',
  };

  public authService: IndexService = inject(IndexService);
  public router: Router = inject(Router);

  public validarForm() {}
}
