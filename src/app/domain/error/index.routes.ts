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
                    import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
            },
            {
                path: ROUTES.REDIRECT.NOT_FOUND,
                loadComponent: () =>
                    import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
            },
            {
                path: '',
                redirectTo: ROUTES.REDIRECT.NOT_FOUND,
                pathMatch: 'full'
            },

        ]
    },
];