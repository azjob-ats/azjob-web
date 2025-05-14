import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { ListboxModule } from 'primeng/listbox';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';

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
    this.items = [
      {
        label: 'Theme',
        routerLink: '/showcase'
      },
      {
        label: 'Componentes',
        items: [
          {
            label: 'Button',
            routerLink: 'ButtonComponent'
          },
          {
            label: 'Checkbox',
            routerLink: 'CheckboxComponent'
          },
          {
            label: 'Input',
            routerLink: 'InputComponent'
          }
        ]
      },
      {
        label: 'Typography',
        routerLink: 'utilities/typography'
      },
    ]
  }
}

