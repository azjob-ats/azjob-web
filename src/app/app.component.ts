import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationTabTitleService } from '@domain/change-language/services/navigation-tab-title.service';
import { TranslateModule } from '@ngx-translate/core';
import { SideNavigationMenuMainContainerComponent } from '@widget/components/SideNavigationMenu/container/side-navigation-menu-main-container/side-navigation-menu-main-container.component';

@Component({
  imports: [RouterModule, TranslateModule, SideNavigationMenuMainContainerComponent, TranslateModule],
  selector: 'app-root',
  template: `
    <div class="grid nested-grid">
        <div class="col-2 col-fixed m-0 p-0 ">
            <div class="p-0 h-full">
               <app-side-navigation-menu-main-container/>
            </div>
        </div>
        <div class="col-10 m-0 p-0">
            <div class="p-0">
              <router-outlet></router-outlet>
            </div>
        </div>
    </div>
  `,
})
export class AppComponent {
  private titleService: NavigationTabTitleService = inject(NavigationTabTitleService);

  public ngOnInit(): void {
    this.titleService.init();
  }
}
