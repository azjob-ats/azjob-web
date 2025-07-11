import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '@domain/auth/components/button/button.component';
import { FooterComponent } from '@domain/auth/components/footer/footer.component';
import { HeaderComponent } from '@domain/auth/components/header/header.component';
import { BaseAuthModel } from '@domain/auth/models/base-auth.model';
import { ButtonModule } from 'primeng/button';

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
export class PanelSignInComponent extends BaseAuthModel { }
