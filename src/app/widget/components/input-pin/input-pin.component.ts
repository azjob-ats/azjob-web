import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PinCodeComponent } from '../pin-code/pin-code.component';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  @Input() formControl: FormControl<any> = new FormControl('');
  @Input() erroRequired: string = 'Campo obrigatório.';
  @Input() hasErrorResponse: string = 'Hover um error :(';

  ngOnInit(): void {}
}
