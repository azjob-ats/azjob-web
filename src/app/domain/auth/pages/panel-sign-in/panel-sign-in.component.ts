import { Component, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '@domain/auth/components/button/button.component';
import { FooterComponent } from '@domain/auth/components/footer/footer.component';
import { HeaderComponent } from '@domain/auth/components/header/header.component';
import { ButtonModule } from 'primeng/button';
import { environment } from 'src/environments/environment';
const { ROUTES } = environment;

@Component({
  selector: 'app-panel-sign-in',
  imports: [
    RouterModule,
    ButtonModule,
    HeaderComponent,
    FooterComponent,
    ButtonComponent
  ],
  templateUrl: './panel-sign-in.component.html',
  styleUrl: './panel-sign-in.component.scss'
})
export class PanelSignInComponent {
  protected signUpRouterLink = `/${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.PANEL_SIGN_UP}`;
  protected signInRouterLink = `/${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.SIGN_IN}`;
}
