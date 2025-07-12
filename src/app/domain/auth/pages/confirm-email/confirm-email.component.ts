import { Component, computed, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FooterComponent } from '@domain/auth/components/footer/footer.component';
import { HeaderComponent } from '@domain/auth/components/header/header.component';
import { BaseAuthModel } from '@domain/auth/models/base-auth.model';
import { ApiResponse } from '@shared/interfaces/api-response';
import { InputPinComponent } from '@widget/components/input-pin/input-pin.component';
import { LoadingSpinnerDirective } from '@widget/directives/loading-spinner.directive';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-confirm-email',
  imports: [
    RouterModule,
    ButtonModule,
    InputPinComponent,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    LoadingSpinnerDirective,
    FooterComponent,
  ],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
})
export class ConfirmEmailComponent extends BaseAuthModel {
  private route = inject(ActivatedRoute);
  public email = computed(() => this.route.snapshot.queryParamMap.get('email') ?? '');

  public validatePin(): void {
    if (this.pinControl.status == 'INVALID') {
      this.pinControl.markAsTouched();
      return;
    }

    this.isLoadingValidatePin = true;

    this.authService.confirmEmailByCode(this.pinControl.value!, this.email()).subscribe({
      next: (res: ApiResponse<unknown>) => {
        this.isLoadingValidatePin = false;
        if (res.statusCode === 200) {
          this.router.navigate([this.signInRouterLink]);
          return;
        }
      },
      error: err => {
        if (err.errors![0].code === 'auth/wrong-email') {
          this.pinOption.hasErrorResponse = err.errors![0].message;
          this.pinControl.setErrors({ hasErrorResponse: true });
        }

        if (err.errors![0].code === 'auth/wrong-pin-not-found') {
          this.pinOption.hasErrorResponse = err.errors![0].message;
          this.pinControl.setErrors({ hasErrorResponse: true });
        }
        this.isLoadingValidatePin = false;
      },
    });
  }
}
