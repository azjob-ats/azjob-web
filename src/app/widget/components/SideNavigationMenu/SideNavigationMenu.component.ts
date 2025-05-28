import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { FormControl } from '@angular/forms';
import { InputSearchComponent } from '../input-search/input-search.component';


@Component({
  selector: 'app-side-navigation-menu',
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule,
    InputSearchComponent
  ],
  templateUrl: './SideNavigationMenu.component.html',
  styleUrl: './SideNavigationMenu.component.scss',
})
export class SideNavigationMenuComponent implements OnInit {
  formControl = new FormControl('');
  texty = 'Copyright © 2025 azjob. All rights reserved'
  ngOnInit(): void { }

}
