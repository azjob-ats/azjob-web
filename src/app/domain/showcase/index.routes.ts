import { Routes } from '@angular/router';
import { ButtonComponent } from './pages/components/button/button.component';
import { CheckboxComponent } from './pages/components/checkbox/checkbox.component';
import { InputComponent } from './pages/components/input/input.component';
import { HomeComponent } from './pages/home/home.component';
import { TemplateComponent } from './pages/templates/template.component';
import { RenderingComponent } from './pages/rendering/rendering.component';
import { ThemeComponent } from './pages/theme/theme.component';
import { TypographyComponent } from './pages/utilities/typography/typography.component';
import { iTemplateComponent } from './interfaces/index.interface';
import { templete } from '@domain/showcase/pages/rendering/template';

const generateRoutes = (templates: iTemplateComponent[]): Routes => {
  return templates.map(template => ({
    path: template.component.name,
    component: RenderingComponent,
  }));
};

export const INDEX_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: ThemeComponent },
      ...generateRoutes(templete),
      { path: 'utilities/typography', component: TypographyComponent },
    ]
  }
];
