import { Routes } from '@angular/router';
import { ButtonComponent } from './pages/components/button/button.component';
import { CheckboxComponent } from './pages/components/checkbox/checkbox.component';
import { InputComponent } from './pages/components/input/input.component';
import { HomeComponent } from './pages/home/home.component';
import { TemplateComponent } from './pages/templates/template.component';
import { RenderingComponent } from './pages/rendering/rendering.component';
import { ThemeComponent } from './pages/theme/theme.component';
import { TypographyComponent } from './pages/utilities/typography/typography.component';

export const INDEX_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: ThemeComponent },
      { path: 'ButtonComponent', component: RenderingComponent },
      { path: 'CheckboxComponent', component: RenderingComponent },
      { path: 'InputComponent', component: RenderingComponent },
      { path: 'utilities/typography', component: TypographyComponent },
    ]
  },
];
