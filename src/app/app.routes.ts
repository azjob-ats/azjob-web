import { Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
const { ROUTES } = environment;

export const routes: Routes = [
  {
    path: ROUTES.FOR_YOU.ROOT,
    loadComponent: () => import('./domain/for-you/pages/app.component').then(m => m.AppComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('./domain/for-you/index.routes').then(m => m.INDEX_ROUTES),
      },
    ],
    data: { title: 'sidebar.forYou' },
  },
  {
    path: ROUTES.APPLICATION.ROOT,
    loadComponent: () => import('./domain/application/pages/app.component').then(m => m.AppComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('./domain/application/index.routes').then(m => m.INDEX_ROUTES),
      },
    ],
    data: { title: 'sidebar.applications' },
  },
  {
    path: ROUTES.MY_COMPANY.ROOT,
    loadComponent: () => import('./domain/my-company/pages/app.component').then(m => m.AppComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('./domain/my-company/index.routes').then(m => m.INDEX_ROUTES),
      },
    ],
    data: { title: 'sidebar.myCompany' },
  },
  {
    path: ROUTES.NOTIFICATION.ROOT,
    loadComponent: () => import('./domain/notification/pages/app.component').then(m => m.AppComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('./domain/notification/index.routes').then(m => m.INDEX_ROUTES),
      },
    ],
    data: { title: 'sidebar.notifications' },
  },
  {
    path: ROUTES.RESUME.ROOT,
    loadComponent: () => import('./domain/resume/pages/app.component').then(m => m.AppComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('./domain/resume/index.routes').then(m => m.INDEX_ROUTES),
      },
    ],
    data: { title: 'sidebar.resume' },
  },
  {
    path: ROUTES.SHOWCASE.ROOT,
    loadComponent: () => import('./domain/showcase/pages/app.component').then(m => m.AppComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('./domain/showcase/index.routes').then(m => m.INDEX_ROUTES),
      },
    ],
    data: { title: 'app.welcome' },
  },
  {
    path: ROUTES.CHANGE_LANGUAGE.ROOT,
    loadComponent: () =>
      import('./domain/change-language/pages/app.component').then(m => m.AppComponent),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./domain/change-language/index.routes').then(m => m.INDEX_ROUTES),
      },
    ],
    data: { title: 'app.welcome' },
  },
  {
    path: ROUTES.AUTH.LOGIN,
    loadComponent: () => import('./domain/auth/pages/app.component').then(m => m.AppComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('./domain/auth/index.routes').then(m => m.INDEX_ROUTES),
      },
    ],
    data: { title: 'sidebar.forYou' },
  },
  {
    path: '**',
    redirectTo: ROUTES.ERROR.NOT_FOUND,
  },
];
