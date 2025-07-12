import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input-email',
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
    <label for="email">{{ title }}</label>

    <p-iconfield class="w-full">
      <input
        type="email"
        pInputText
        id="email"
        pSize="large"
        class="w-full"
        [formControl]="formControl"
        #email
      />

      <!-- Botão para limpar -->
      <p-inputicon *ngIf="email.value" styleClass="inputIconTop">
        <p-button
          (click)="clear(email)"
          [rounded]="true"
          severity="primary"
          styleClass="p-0"
          [disabled]="isDisabled"
        >
          <i class="pi pi-times" style="font-size: 10px; padding: 5px"></i>
        </p-button>
      </p-inputicon>
    </p-iconfield>

    <!-- Mensagens de erro -->
    <div>
      <small class="err-small" *ngIf="formControl.hasError('required') && formControl.touched">
        {{ erroRequired }}
      </small>
    </div>
    <div>
      <small class="err-small" *ngIf="formControl.hasError('email') && formControl.touched">
        {{ erroInvalid }}
      </small>
    </div>
    <div>
      <small class="err-small" *ngIf="formControl.hasError('minlength') && formControl.touched">
        {{ erroFill }}
      </small>
    </div>
    <div>
      <small
        class="err-small"
        *ngIf="formControl.hasError('hasErrorResponse') && formControl.touched"
      >
        {{ hasErrorResponse }}
      </small>
    </div>
  `,
  styles: [''],
})
export class InputEmailComponent implements OnInit {
  @Input() formControl!: FormControl<any>;
  @Input() title: string = 'E‑mail';
  @Input() erroRequired: string = 'Campo obrigatório.';
  @Input() erroInvalid: string = 'E‑mail inválido.';
  @Input() erroFill: string = 'Tamanho mínimo não atingido.';
  @Input() hasErrorResponse: string = 'Hover um error :(';
  @Input() isRequired = false;
  @Input() isDisabled = false;
  @Input() minLength?: number;
  @Input() maxLength?: number;

  private initialControlValue!: any;
  private initialDisabledState!: boolean;

  ngOnInit(): void {
    this.initialControlValue = this.formControl.value;
    this.initialDisabledState = this.isDisabled;

    const validators = [...(this.isRequired ? [Validators.required] : []), Validators.email];

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

  clear(input: HTMLInputElement): void {
    input.value = '';
    this.formControl.setValue(null);
    this.formControl.markAsDirty();
  }
}
