import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input-secondary',
  template: `
    <p-iconfield class="w-full">
      <input
        type="text"
        pInputText
        id="firstname"
        placeholder="Nome"
        pSize="large"
        class="w-full"
        #firstname
      />
      <p-inputicon *ngIf="firstname.value" styleClass="inputIconTop">
        <p-button
          (click)="firstname.value = ''"
          [rounded]="true"
          severity="primary"
          styleClass="p-0"
          [disabled]="isDisabled"
        >
          <i class="pi pi-times" style="font-size: 10px; padding: 5px"></i>
        </p-button>
      </p-inputicon>
    </p-iconfield>

    <small class="err-small" *ngIf="formControl.hasError('required') && formControl.touched">
      {{ erroRequired }}
    </small>
    <small class="err-small" *ngIf="formControl.hasError('minlength') && formControl.touched">
      {{ erroFill }}
    </small>
  `,
  styles: [''],
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
})
export class InputSecondaryComponent {
  @Input() public formControl!: FormControl<any>;
  @Input() public title!: string;
  @Input() public erroFill!: string;
  @Input() public erroRequired!: string;
  @Input() public isRequired = false;
  @Input() public isDisabled = false;
  @Input() public minLength!: number;
  @Input() public maxLength!: number;
  public isReady = false;

  public ngOnChanges() {
    setTimeout(() => {
      this.isReady = true;
    });
  }

  private initialControlValue: any;
  private initialDisabledState!: boolean;
  private initialValidator: any;

  public ngOnInit(): void {
    this.initialControlValue = this.formControl.value;
    this.initialDisabledState = this.isDisabled;
    this.initialValidator = this.isRequired ? Validators.required : null;

    this.applyDisabledState(this.isDisabled);
    this.applyMinLength(this.minLength);
    this.applyMaxLength(this.maxLength);
    this.applyRequiredValidator(this.isRequired);
  }

  private applyMinLength(min: number) {
    if (min == null || min <= 0) {
      return;
    }

    const existingValidators = this.formControl.validator ? [this.formControl.validator] : [];
    this.formControl.setValidators([...existingValidators, Validators.minLength(min)]);
    this.formControl.updateValueAndValidity();
  }

  private applyMaxLength(max: number) {
    if (max == null || max <= 0) {
      return;
    }

    const existingValidators = this.formControl.validator ? [this.formControl.validator] : [];
    this.formControl.setValidators([...existingValidators, Validators.maxLength(max)]);
    this.formControl.updateValueAndValidity();
  }

  public resetToInitialState(): void {
    this.formControl.patchValue(this.initialControlValue);
    this.applyRequiredValidator(this.initialValidator !== null);
    this.applyDisabledState(this.initialDisabledState);
    this.formControl.markAsUntouched();
    this.formControl.updateValueAndValidity();
  }

  public enable(): void {
    this.formControl.enable();
  }

  public disable(): void {
    this.formControl.disable();
  }

  private applyDisabledState(shouldDisable: boolean): void {
    shouldDisable ? this.disable() : this.enable();
  }

  private applyRequiredValidator(isRequired: boolean): void {
    const existingValidators = this.formControl.validator ? [this.formControl.validator] : [];
    if (isRequired) {
      this.formControl.setValidators([...existingValidators, Validators.required]);
    } else {
      this.formControl.setValidators(existingValidators.filter(v => v !== Validators.required));
    }
    this.formControl.updateValueAndValidity();
  }
}
