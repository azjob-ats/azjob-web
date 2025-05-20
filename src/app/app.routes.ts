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
    data: { title: 'AZJOB.TEST.HOME' },
  },
  {
    path: 'change-language',
    loadComponent: () =>
      import('./domain/change-language/pages/app.component').then(
        (m) => m.AppComponent
      ),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./domain/change-language/index.routes').then(
            (m) => m.INDEX_ROUTES
          ),
      },
    ],
    data: { title: 'AZJOB.TEST.HOME' },
  },
];
