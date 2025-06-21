import { ChangeDetectionStrategy, Component, Input, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Input() link!: string;
  @Input() text!: string;
  @Input() redirectText!: string;
}
