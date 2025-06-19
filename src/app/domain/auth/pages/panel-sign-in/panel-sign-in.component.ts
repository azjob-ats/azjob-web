import { Component, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-panel-sign-in',
  imports: [
    RouterModule,
    ButtonModule
  ],
  templateUrl: './panel-sign-in.component.html',
  styleUrl: './panel-sign-in.component.scss'
})
export class PanelSignInComponent implements OnInit {
  protected sidebarLogoRouterLink = '/'
  protected signUpRouterLink = '/auth/panel-sign-up'
  ngOnInit(): void { }

}
