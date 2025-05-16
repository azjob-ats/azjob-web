import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { componentMap } from '@domain/showcase/configs/component-map.configs';
import { iTemplateComponent } from '@domain/showcase/interfaces/index.interface';
import { MenuItem } from 'primeng/api';
import { ListboxModule } from 'primeng/listbox';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';

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
        label: 'Template azjob',
        routerLink: 'template'
      },
      {
        label: 'Components',
        items: mapToMenuItems(componentMap),
      }
    ]
  }
}

