import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkbox',
  template: `
    <div class="app-checkbox">
      <p-checkbox 
        [formControl]="formControl"
        [binary]="binary"
        (onChange)="clickEvent.emit($event)"
        [disabled]="isDisabled"
        [required]="isRequired"
        [attr.aria-label]="ariaLabel">
      </p-checkbox>
    </div>
  `,
  styles: [`
    .app-checkbox {
      display: inline-block;
    }
  `],
  standalone: true,
  imports: [CheckboxModule, ReactiveFormsModule, CommonModule],
})
export class CheckboxComponent {
  @Output() public clickEvent: EventEmitter<any> = new EventEmitter();
  @Input() public formControl!: FormControl;
  @Input() public items: any[] = [];
  @Input() public isRequired = false;
  @Input() public isDisabled = true;
  @Input() public binary = true;
  @Input() public ariaLabel!: string;

  // These might be useful for validation messages
  @Input() public title!: string;
  @Input() public erroFill!: string;
  @Input() public erroRequired!: string;
}