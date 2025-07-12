import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageSelectComponent } from '@widget/components/language-select/language-select.component';

@Component({
  selector: 'app-footer',
  imports: [RouterModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  @Input() link!: string;
  @Input() text!: string;
  @Input() showTextPrivacyAndPolicy: boolean = true;
  @Input() redirectText!: string;
  protected year: number = new Date().getFullYear();
}
