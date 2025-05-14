import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  template: `
    <p-button
      [label]="label"
      [icon]="fontIcon"
      [disabled]="isDisabled"
      [loading]="isLoading"
      [styleClass]="styleClass"
      (onClick)="clickEvent.emit($event)"
      [attr.aria-label]="ariaLabel">
    </p-button>
  `,
  standalone: true,
  imports: [ButtonModule, CommonModule],
})
export class ButtonComponent {
  @Output() public clickEvent: EventEmitter<any> = new EventEmitter();
  @Input() public label!: string;
  @Input() public styleClass = '';
  @Input() public isDisabled = false;
  @Input() public isLoading = false;
  @Input() public fontIcon = '';
  @Input() public ariaLabel!: string;
}
