import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  @Input() public link!: string;
  @Input() public text!: string;
  @Input() public showTextPrivacyAndPolicy: boolean = true;
  @Input() public redirectText!: string;
  protected year: number = new Date().getFullYear();
}
