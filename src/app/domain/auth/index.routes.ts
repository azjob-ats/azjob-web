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
          import('./pages/panel/panel.component').then(m => m.PanelComponent),
      },
      {
        path: ROUTES.AUTH.PANEL,
        loadComponent: () =>
          import('./pages/panel/panel.component').then(m => m.PanelComponent),
      },
      {
        path: ROUTES.AUTH.LOGIN,
        loadComponent: () =>
          import('./pages/sign-in/sign-in.component').then(m => m.SignInComponent),
      },
      {
        path: '',
        redirectTo: ROUTES.AUTH.PANEL,
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: ROUTES.ERROR.NOT_FOUND,
      },
    ],
  },
];
