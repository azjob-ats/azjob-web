import { Routes } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment';
const { ROUTES } = environment;


export const INDEX_ROUTES: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: ROUTES.FOR_YOU.ROOT,
                loadComponent: () => import('@domain/for-you/pages/app.component').then(m => m.AppComponent),
                children: [
                    {
                        path: '',
                        loadChildren: () => import('@domain/for-you/index.routes').then(m => m.INDEX_ROUTES),
                    },
                ],
                data: { title: 'sidebar.forYou' },
            },
            {
                path: ROUTES.APPLICATION.ROOT,
                loadComponent: () =>
                    import('@domain/application/pages/app.component').then(m => m.AppComponent),
                children: [
                    {
                        path: '',
                        loadChildren: () => import('@domain/application/index.routes').then(m => m.INDEX_ROUTES),
                    },
                ],
                data: { title: 'sidebar.applications' },
            },
            {
                path: ROUTES.MY_COMPANY.ROOT,
                loadComponent: () =>
                    import('@domain/my-company/pages/app.component').then(m => m.AppComponent),
                children: [
                    {
                        path: '',
                        loadChildren: () => import('@domain/my-company/index.routes').then(m => m.INDEX_ROUTES),
                    },
                ],
                data: { title: 'sidebar.myCompany' },
            },
            {
                path: ROUTES.NOTIFICATION.ROOT,
                loadComponent: () =>
                    import('@domain/notification/pages/app.component').then(m => m.AppComponent),
                children: [
                    {
                        path: '',
                        loadChildren: () => import('@domain/notification/index.routes').then(m => m.INDEX_ROUTES),
                    },
                ],
                data: { title: 'sidebar.notifications' },
            },
            {
                path: ROUTES.RESUME.ROOT,
                loadComponent: () => import('@domain/resume/pages/app.component').then(m => m.AppComponent),
                children: [
                    {
                        path: '',
                        loadChildren: () => import('@domain/resume/index.routes').then(m => m.INDEX_ROUTES),
                    },
                ],
                data: { title: 'sidebar.resume' },
            },

            {
                path: ROUTES.AUTH.SIGN_IN,
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
                path: '',
                redirectTo: ROUTES.FOR_YOU.ROOT,
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: ROUTES.REDIRECT.ROOT,
            },
        ]
    },
];