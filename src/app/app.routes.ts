import { Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
const { ROUTES } = environment;

export const routes: Routes = [
  {
    path: ROUTES.HOME.ROOT,
    loadComponent: () => import('@domain/home/pages/app.component').then(m => m.AppComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('@domain/home/index.routes').then(m => m.INDEX_ROUTES),
      },
    ],
    data: { title: 'sidebar.forYou' },
  },
  {
    path: ROUTES.AUTH.ROOT,
    loadComponent: () => import('@domain/auth/pages/app.component').then(m => m.AppComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('@domain/auth/index.routes').then(m => m.INDEX_ROUTES),
      },
    ],
    data: { title: 'sidebar.forYou' },
  },
  {
    path: ROUTES.SHOWCASE.ROOT,
    loadComponent: () => import('@domain/showcase/pages/app.component').then(m => m.AppComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('@domain/showcase/index.routes').then(m => m.INDEX_ROUTES),
      },
    ],
    data: { title: 'app.welcome' },
  },
  {
    path: ROUTES.REDIRECT.ROOT,
    loadComponent: () => import('@domain/error/pages/app.component').then(m => m.AppComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('@domain/error/index.routes').then(m => m.INDEX_ROUTES),
      },
    ],
    data: { title: 'app.welcome' },
  },
  {
    path: '',
    redirectTo: ROUTES.HOME.ROOT,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: ROUTES.REDIRECT.ROOT,
  },
];
