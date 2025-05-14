import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { ListboxModule } from 'primeng/listbox';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { iTemplateComponent } from '@domain/showcase/interfaces/index.interface';
import { templete } from '@domain/showcase/pages/rendering/template';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    ListboxModule,
    MenuModule,
    PanelMenuModule,
    FormsModule,
    MenubarModule,
  ],
})
export class HomeComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {

    const mapToMenuItems = (templates: iTemplateComponent[]): MenuItem[] => {
      return templates.map((template) => ({
        label: template.title,
        routerLink: template.component.name,
      }));
    };

    this.items = [
      {
        label: 'Theme',
        routerLink: '/showcase'
      },
      {
        label: 'Componentes',
        items: mapToMenuItems(templete),
      },
      {
        label: 'Typography',
        routerLink: 'utilities/typography'
      },
    ]
  }
}

