import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Dialog, DialogModule } from 'primeng/dialog';
import { environment } from '@env/environment';
import { ButtonModule } from 'primeng/button';
import { SideFeedbakHelpContainerComponent } from '@widget/components/SideNavigationMenu/container/side-feedbak-help-container/side-feedbak-help-container.component';
const { ROUTES } = environment;

@Component({
  selector: 'app-header',
  imports: [RouterModule, Dialog, ButtonModule, SideFeedbakHelpContainerComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  protected sidebarLogoRouterLink = ROUTES.ROOT

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  closeDialog($event: any) {
    this.visible = false;
  }
}
