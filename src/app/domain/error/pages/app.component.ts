import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-index',
  template: '<router-outlet></router-outlet>',
  styles: '',
  standalone: true,
  imports: [RouterModule],
})
export class AppComponent {}
