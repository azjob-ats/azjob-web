import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationTabTitleService } from '@domain/change-language/services/navigation-tab-title.service';
import { environment } from 'src/environments/environment';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  template: '<router-outlet></router-outlet> {{ name }}',
})
export class AppComponent {
  name = import.meta.env.NG_APP_API_URL;
  private titleService: NavigationTabTitleService = inject(
    NavigationTabTitleService
  );

  public ngOnInit(): void {
    console.log('->', import.meta.env['NG_APP_API_URL']);
    console.log('->', environment.apiUrl2);
    console.log('->', environment.apiUrl3);
    this.titleService.init();
  }
}
