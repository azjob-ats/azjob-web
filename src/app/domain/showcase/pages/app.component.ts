import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-index',
  template: '<router-outlet></router-outlet>',
  styles: [`
    :host {
      --p-menubar-background: #000;
      --p-menubar-item-icon-color: #fff;
      --p-menubar-border-color: transparent;
      --p-menubar-border-radius: 0;
      --p-menubar-color: var(--p-content-color);
      --p-menubar-gap: 0.5rem;
      --p-menubar-padding: 0.75rem 1rem;
      --p-menubar-transition-duration: var(--p-transition-duration);
      --p-menubar-base-item-border-radius: var(--p-content-border-radius);
      --p-menubar-base-item-padding: 0.75rem 1rem;
      --p-menubar-item-focus-background:#353535;
      --p-menubar-item-active-background:#141414;
      --p-menubar-item-color:  #fff;
      --p-menubar-item-focus-color:  #fff;
      --p-menubar-item-active-color:  #fff;
      --p-menubar-item-padding: var(--p-navigation-item-padding);
      --p-menubar-item-border-radius: var(--p-navigation-item-border-radius);
      --p-menubar-item-gap: var(--p-navigation-item-gap);
      --p-menubar-item-icon-focus-color:  #fff;
      --p-menubar-item-icon-active-color:  #fff;
      --p-menubar-submenu-padding: var(--p-navigation-list-padding);
      --p-menubar-submenu-gap: var(--p-navigation-list-gap);
      --p-menubar-submenu-background: #000;
      --p-menubar-submenu-border-color: #000;
      --p-menubar-submenu-border-radius: 0;
      --p-menubar-submenu-shadow: 0;
      --p-menubar-submenu-mobile-indent: 1.25rem;
      --p-menubar-submenu-icon-size: var(--p-navigation-submenu-icon-size);
      --p-menubar-submenu-icon-color:  #fff;
      --p-menubar-submenu-icon-focus-color:  #fff;
      --p-menubar-submenu-icon-active-color: #fff;
      --p-menubar-separator-border-color: var(--p-content-border-color);
      --p-menubar-mobile-button-border-radius: 50%;
      --p-menubar-mobile-button-size: 2rem;
      --p-menubar-mobile-button-color: #fff;
      --p-menubar-mobile-button-hover-color: #fff;
      --p-menubar-mobile-button-hover-background: var(--p-content-hover-background);
      --p-menubar-mobile-button-focus-ring-width: var(--p-focus-ring-width);
      --p-menubar-mobile-button-focus-ring-style: var(--p-focus-ring-style);
      --p-menubar-mobile-button-focus-ring-color: var(--p-focus-ring-color);
      --p-menubar-mobile-button-focus-ring-offset: var(--p-focus-ring-offset);
      --p-menubar-mobile-button-focus-ring-shadow: var(--p-focus-ring-shadow);
    }
  `],
  imports: [RouterModule],
})
export class AppComponent { }
