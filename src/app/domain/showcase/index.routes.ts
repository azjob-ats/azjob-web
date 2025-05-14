import { Routes } from '@angular/router';
import { componentMap } from '@domain/showcase/configs/component-map.configs';
import { iTemplateComponent } from './interfaces/index.interface';
import { HomeComponent } from './pages/home/home.component';
import { RenderingComponent } from './pages/rendering/rendering.component';
import { TemplateComponent } from './pages/template/template.component';
import { TypographyComponent } from './pages/utilities/typography/typography.component';

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
      { path: '', component: TemplateComponent },
      { path: 'template', component: TemplateComponent },
      ...generateRoutes(componentMap),
      { path: 'utilities/typography', component: TypographyComponent },
    ]
  }
];
