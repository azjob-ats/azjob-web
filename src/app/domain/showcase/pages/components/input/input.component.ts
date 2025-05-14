
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-input',
  template: `
    <div class="app-input">
      <span class="p-float-label">
                <label *ngIf="title">{{ title }}</label>
        <input 
          pInputText
          [formControl]="formControl"
          [placeholder]="placeholder!"
          [attr.aria-label]="ariaLabel"
        />
      </span>

      <small
        *ngIf="formControl.hasError('required') && formControl.touched"
      >
        {{ erroRequired }}
      </small>
      <small
        *ngIf="formControl.hasError('email') && formControl.touched"
      >
        {{ erroFill }}
      </small>
      <small
        *ngIf="formControl.hasError('minlength') && formControl.touched"
      >
        {{ erroFill }}
      </small>
    </div>
  `,
  styles: [`
    .app-input {
      width: 100%;
      margin-bottom: 1rem;
    }
    
    .p-float-label {
      display: block;
      position: relative;
    }
    
    .p-float-label input {
      width: 100%;
    }
  `],
  standalone: true,
  imports: [InputTextModule, InputMaskModule, ReactiveFormsModule, CommonModule],
})
export class InputComponent {
  @Input() public formControl!: FormControl<any>;
  @Input() public title!: string;
  @Input() public placeholder!: string;
  @Input() public erroFill!: string;
  @Input() public erroRequired!: string;
  @Input() public ariaLabel!: string;
  @Input() public isRequired = false;
  @Input() public isDisabled = false;
  @Input() public minLength!: number;
  @Input() public maxLength!: number;
  public isReady = false;
  public hide = false;

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

    const existingValidators = this.formControl.validator
      ? [this.formControl.validator]
      : [];
    this.formControl.setValidators([
      ...existingValidators,
      Validators.minLength(min),
    ]);
    this.formControl.updateValueAndValidity();
  }

  private applyMaxLength(max: number) {
    if (max == null || max <= 0) {
      return;
    }

    const existingValidators = this.formControl.validator
      ? [this.formControl.validator]
      : [];
    this.formControl.setValidators([
      ...existingValidators,
      Validators.maxLength(max),
    ]);
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
    const existingValidators = this.formControl.validator
      ? [this.formControl.validator]
      : [];
    if (isRequired) {
      this.formControl.setValidators([
        ...existingValidators,
        Validators.required,
      ]);
    } else {
      this.formControl.setValidators(
        existingValidators.filter((v) => v !== Validators.required)
      );
    }
    this.formControl.updateValueAndValidity();
  }
}