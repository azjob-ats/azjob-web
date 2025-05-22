import { Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
const { ROUTES } = environment;

export const routes: Routes = [
  {
    path: ROUTES.SHOWCASE.ROOT,
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
    data: { title: 'AZJOB.TEST.HOME' },
  },
  {
    path: '**',
    redirectTo: ROUTES.ERROR.NOT_FOUND
  }
];
