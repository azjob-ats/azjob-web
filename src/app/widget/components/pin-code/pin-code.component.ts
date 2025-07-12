import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';

@Component({
  selector: 'app-pin-code',
  imports: [InputOtpModule, CommonModule, ReactiveFormsModule, FormsModule],
  template: `<p-inputotp
    [formControl]="formControl"
    [integerOnly]="true"
    [required]="true"
    [length]="4"
    size="large"
    styleClass="w-full custom-h-full custom-pin"
  />`,
  styleUrl: './pin-code.component.scss',
})
export class PinCodeComponent {
  @Input() public formControl!: FormControl<any>;
}
