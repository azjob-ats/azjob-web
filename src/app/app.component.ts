import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationTabTitleService } from '@domain/change-language/services/navigation-tab-title.service';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  private titleService: NavigationTabTitleService = inject(
    NavigationTabTitleService
  );

  public ngOnInit(): void {
    this.titleService.init();
  }
}
