import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputPrimaryComponent } from
  '@widget/components/input-primary/input-primary.component';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';
import { environment } from '@env/environment';
import { HeaderComponent } from '@domain/auth/components/header/header.component';
import { FooterComponent } from '@domain/auth/components/footer/footer.component';
const { ROUTES } = environment;
@Component({
  selector: 'app-confirm-email',
  imports: [
    RouterModule,
    ButtonModule,
    InputOtpModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
})
export class ConfirmEmailComponent {
  protected signInRouterLink = `/${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.PANEL_SIGN_IN}`;
  public pin = new FormControl('');
}