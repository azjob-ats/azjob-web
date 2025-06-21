import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '@env/environment';
const { ROUTES } = environment;

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  protected sidebarLogoRouterLink = ROUTES.ROOT
}
