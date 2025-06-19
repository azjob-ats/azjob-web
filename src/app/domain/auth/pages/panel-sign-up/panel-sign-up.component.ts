import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-panel-sign-up',
  imports: [
    RouterModule,
    ButtonModule
  ],
  templateUrl: './panel-sign-up.component.html',
  styleUrl: './panel-sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelSignUpComponent implements OnInit {
  protected sidebarLogoRouterLink = '/'
  protected signInRouterLink = '/auth/panel-sign-in'
  ngOnInit(): void { }

}
