import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { passwordStrongValidator } from './password-strength.validator';
import { passwordMatchValidator } from './password-match.validator';

@Component({
  selector: 'app-input-password',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    InputIconModule,
    IconFieldModule,
  ],
  template: `
    <label for="password">{{ title }}</label>
    <p-iconfield class="w-full">
      <input
        pInputText
        [id]="idReference"
        pSize="large"
        class="w-full"
        [attr.type]="showPassword ? 'text' : 'password'"
        [formControl]="formControl"
        #passwordInput
      />

      <p-inputicon styleClass="inputIconTop">
        <div class="flex justify-end">
          <p-button
            *ngIf="passwordInput.value"
            (click)="togglePassword()"
            [rounded]="true"
            severity="primary"
            styleClass="p-0 mr-3"
            [disabled]="isDisabled"
          >
            <i
              [class]="'pi ' + (showPassword ? 'pi-eye-slash' : 'pi-eye')"
              style="font-size: 12px; padding: 5px"
            ></i>
          </p-button>
        </div>
      </p-inputicon>
    </p-iconfield>
    <!-- Mensagens de erro -->
    <small class="err-small" *ngIf="formControl.hasError('required') && formControl.touched">
      {{ erroRequired }}
    </small>
    <div>
      <small
        class="err-small"
        *ngIf="formControl.hasError('hasErrorResponse') && formControl.touched"
      >
        {{ hasErrorResponse }}
      </small>
    </div>
    <small *ngIf="formControl.hasError('passwordWeak') && formControl.touched">
      <div><small class="err-small" *ngIf="!hasUpperCase">Contém letra maiúscula (A-Z)</small></div>
      <div><small class="err-small" *ngIf="!hasLowerCase">Contém letra minúscula (a-z)</small></div>
      <div><small class="err-small" *ngIf="!hasNumber">Contém número (0-9)</small></div>
      <div><small class="err-small" *ngIf="!hasSymbol">Contém símbolo (!#$...)</small></div>
      <div>
        <small class="err-small" *ngIf="!isLongEnough">{{ erroFill }}</small>
      </div>
    </small>
    <small
      class="err-small"
      *ngIf="formControl.hasError('passwordMismatch') && formControl.touched"
    >
      As senhas não coincidem.
    </small>
  `,
  styles: [''],
})
export class InputPasswordComponent implements OnInit {
  @Input() formControl!: FormControl<any>;
  @Input() title: string = 'Senha';
  @Input() erroRequired: string = 'Campo obrigatório.';
  @Input() erroFill: string = 'Senha muito curta.';
  @Input() hasErrorResponse: string = 'Hover um error :(';
  @Input() isRequired = false;
  @Input() isDisabled = false;
  @Input() minLength?: number;
  @Input() maxLength?: number;
  @Input() idReference: string = 'password';
  @Input() matchTo?: AbstractControl;

  showPassword = false;
  hasUpperCase = false;
  hasLowerCase = false;
  hasNumber = false;
  hasSymbol = false;
  isLongEnough = false;
  private initialControlValue!: any;
  private initialDisabledState!: boolean;

  ngOnInit(): void {
    if (this.matchTo) {
      this.matchTo.valueChanges.subscribe(() =>
        this.formControl.updateValueAndValidity({ onlySelf: true })
      );
    }
    this.formControl.valueChanges.subscribe(value => {
      this.checkStrength(value);
    });
    this.initialControlValue = this.formControl.value;
    this.initialDisabledState = this.isDisabled;

    const validators = [
      ...(this.isRequired ? [Validators.required] : []),
      passwordStrongValidator(),
      ...(this.matchTo ? [passwordMatchValidator(this.matchTo)] : []),
      // min/maxLength mantidos abaixo
    ];

    if (this.minLength && this.minLength > 0) {
      validators.push(Validators.minLength(this.minLength));
    }

    if (this.maxLength && this.maxLength > 0) {
      validators.push(Validators.maxLength(this.maxLength));
    }

    this.applyDisabledState(this.isDisabled);
    this.formControl.setValidators(validators);
    this.formControl.updateValueAndValidity();
  }

  checkStrength(value: string): void {
    if (!value) {
      this.hasUpperCase = false;
      this.hasLowerCase = false;
      this.hasNumber = false;
      this.hasSymbol = false;
      this.isLongEnough = false;
      return;
    }

    this.hasUpperCase = /[A-Z]/.test(value);
    this.hasLowerCase = /[a-z]/.test(value);
    this.hasNumber = /[0-9]/.test(value);
    this.hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    this.isLongEnough = value.length >= this.minLength!;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  clear(input: HTMLInputElement): void {
    input.value = '';
    this.formControl.setValue(null);
    this.formControl.markAsDirty();
  }

  resetToInitialState(): void {
    this.formControl.patchValue(this.initialControlValue);
    this.applyDisabledState(this.initialDisabledState);
    this.formControl.markAsUntouched();
    this.formControl.updateValueAndValidity();
  }

  enable(): void {
    this.formControl.enable();
  }

  disable(): void {
    this.formControl.disable();
  }

  private applyDisabledState(shouldDisable: boolean): void {
    shouldDisable ? this.disable() : this.enable();
  }
}
