import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InputPrimaryComponent } from '@widget/components/input-primary/input-primary.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-panel',
  imports: [RouterModule,
    ButtonModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent implements OnInit {
  protected sidebarLogoRouterLink = '/'
  ngOnInit(): void { }

}
