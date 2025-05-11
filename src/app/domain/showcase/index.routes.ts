import { Routes } from '@angular/router';

export const INDEX_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/theme/theme.component').then(m => m.ThemeComponent),
    data: { title: 'NOTE.HOME' },
  },
];
