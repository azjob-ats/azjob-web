import { Routes } from '@angular/router';

export const INDEX_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/change-language/change-language.page').then(m => m.ChangeLanguagePage),
    data: { title: 'app.welcome' },
  },
];
