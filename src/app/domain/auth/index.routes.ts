import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { environment } from 'src/environments/environment';
const { ROUTES } = environment;

export const INDEX_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/panel-sign-in/panel-sign-in.component').then(m => m.PanelSignInComponent),
      },
      {
        path: ROUTES.AUTH.PANEL_SIGN_IN,
        loadComponent: () =>
          import('./pages/panel-sign-in/panel-sign-in.component').then(m => m.PanelSignInComponent),
      },
      {
        path: ROUTES.AUTH.PANEL_SIGN_UP,
        loadComponent: () =>
          import('./pages/panel-sign-up/panel-sign-up.component').then(m => m.PanelSignUpComponent),
      },
      {
        path: ROUTES.AUTH.SIGN_IN,
        loadComponent: () =>
          import('./pages/sign-in/sign-in.component').then(m => m.SignInComponent),
      },
      {
        path: ROUTES.AUTH.SIGN_UP,
        loadComponent: () =>
          import('./pages/sign-up/sign-up.component').then(m => m.SignUpComponent),
      },
      {
        path: ROUTES.AUTH.CONFIRM_EMAIL,
        loadComponent: () =>
          import('./pages/confirm-email/confirm-email.component').then(m => m.ConfirmEmailComponent),
      },
      {
        path: ROUTES.AUTH.RESET_PASSWORD,
        loadComponent: () =>
          import('./pages/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
      },
      {
        path: '',
        redirectTo: ROUTES.AUTH.PANEL_SIGN_IN,
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: ROUTES.REDIRECT.ROOT,
      },
    ],
  },
];
