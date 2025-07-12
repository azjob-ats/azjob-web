import { Component, Input } from '@angular/core';
import { PinCodeComponent } from '../pin-code/pin-code.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-pin',
  template: `
    <app-pin-code [formControl]="formControl"></app-pin-code>
    <div>
      <small class="err-small" *ngIf="formControl.hasError('required') && formControl.touched">
        {{ erroRequired }}
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
  styleUrl: './input-pin.component.scss',
  imports: [CommonModule, PinCodeComponent, ReactiveFormsModule, FormsModule],
})
export class InputPinComponent {
  @Input() public formControl: FormControl<unknown> = new FormControl('');
  @Input() public erroRequired: string = 'Campo obrigatório.';
  @Input() public hasErrorResponse: string = 'Hover um error :(';
}
