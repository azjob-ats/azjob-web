import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Dialog } from 'primeng/dialog';
import { environment } from '@env/environment';
import { ButtonModule } from 'primeng/button';
import { SideFeedbakHelpContainerComponent } from '@widget/components/SideNavigationMenu/container/side-feedbak-help-container/side-feedbak-help-container.component';
import { ICON_AZJOB } from '@shared/constants/app.constant';
const { ROUTES } = environment;

@Component({
  selector: 'app-header',
  imports: [RouterModule, Dialog, ButtonModule, SideFeedbakHelpContainerComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected sidebarLogoRouterLink = ROUTES.ROOT;
  protected ICON_AZJOB = ICON_AZJOB;

  public visible: boolean = false;

  public showDialog(): void {
    this.visible = true;
  }

  public closeDialog(_$event: boolean): void {
    this.visible = false;
  }
}
