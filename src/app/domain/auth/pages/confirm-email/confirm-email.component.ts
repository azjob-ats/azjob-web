import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputPrimaryComponent } from
  '@widget/components/input-primary/input-primary.component';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';

@Component({
  selector: 'app-confirm-email',
  imports: [
    RouterModule,
    ButtonModule,
    InputOtpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
})
export class ConfirmEmailComponent {
  protected sidebarLogoRouterLink = '/'
  protected signUpRouterLink = '/auth/panel-sign-in'
  public pin = new FormControl('');
}