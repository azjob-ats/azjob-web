import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'showcase',
    loadComponent: () => import('./domain/showcase/pages/app.component').then(m => m.AppComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('./domain/showcase/index.routes').then(m => m.INDEX_ROUTES),
      },
    ],
  },
];
