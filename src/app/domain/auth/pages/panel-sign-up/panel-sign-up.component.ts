import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '@domain/auth/components/button/button.component';
import { FooterComponent } from '@domain/auth/components/footer/footer.component';
import { HeaderComponent } from '@domain/auth/components/header/header.component';
import { environment } from '@env/environment';
import { ButtonModule } from 'primeng/button';
const { ROUTES } = environment;
@Component({
  selector: 'app-panel-sign-up',
  imports: [
    RouterModule,
    ButtonModule,
    HeaderComponent,
    FooterComponent,
    ButtonComponent
  ],
  templateUrl: './panel-sign-up.component.html',
  styleUrl: './panel-sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelSignUpComponent implements OnInit {
  protected signInRouterLink = `/${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.PANEL_SIGN_IN}`;
  protected signUpRouterLink = `/${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.SIGN_UP}`;
  ngOnInit(): void { }
}
