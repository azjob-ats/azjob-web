import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const INDEX_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: []
    },
];