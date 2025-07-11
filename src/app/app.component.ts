import { Component, inject, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationTabTitleService } from '@domain/change-language/services/navigation-tab-title.service';
import { TranslateModule } from '@ngx-translate/core';
import { SideNavigationMenuMainContainerComponent } from '@widget/components/SideNavigationMenu/container/side-navigation-menu-main-container/side-navigation-menu-main-container.component';

@Component({
  imports: [
    RouterModule,
    TranslateModule,
    TranslateModule,
  ],
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: ` `,
})
export class AppComponent {
  private titleService: NavigationTabTitleService = inject(NavigationTabTitleService);

  public ngOnInit(): void {
    this.titleService.init();
  }
}
