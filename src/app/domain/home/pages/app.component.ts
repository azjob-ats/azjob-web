import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IndexService } from '@domain/auth/services/index.service';
import { NavigationTabTitleService } from '@domain/change-language/services/navigation-tab-title.service';
import { TranslateModule } from '@ngx-translate/core';
import { SideNavigationMenuMainContainerComponent } from '@widget/components/SideNavigationMenu/container/side-navigation-menu-main-container/side-navigation-menu-main-container.component';

@Component({
  imports: [
    RouterModule,
    TranslateModule,
    SideNavigationMenuMainContainerComponent,
    TranslateModule,
    CommonModule,
  ],
  selector: 'app-index',
  template: `
    <div class="grid nested-grid">
      <div class="m-0 p-0 menu-app">
        <div class="p-0 h-full">
          <app-side-navigation-menu-main-container />
        </div>
      </div>
      <div class="m-0 p-0 router-app">
        <div class="p-0">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: `
    @use 'breakpoints.scss' as *;
    .menu-app {
      width: 270px;
    }

    .router-app {
      width: calc(100% - 270px);
    }

    @media (max-width: $mobile) {
      .menu-app {
        width: 55px;
      }

      .router-app {
        width: calc(100% - 55px);
      }
    }
  `,
})
export class AppComponent {
  private titleService: NavigationTabTitleService = inject(NavigationTabTitleService);

  public ngOnInit(): void {
    this.titleService.init();
  }
}
