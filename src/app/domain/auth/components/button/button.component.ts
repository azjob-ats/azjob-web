import { ChangeDetectionStrategy, Component, Input, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  imports: [ButtonModule, RouterModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() link: string = '';
}
