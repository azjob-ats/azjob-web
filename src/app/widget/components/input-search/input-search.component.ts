import { Component } from '@angular/core';
import { ImportsModule } from '@core/imports';

@Component({
  selector: 'app-input-search',
  template: `
  <input type="text" pInputText id="firstname" placeholder="Procurar" pSize="large" class="w-full" />
  `,
  styles: [
    `
      input {
        height: 42px;
        margin-top: 6px;
      }
    `,
  ],
  standalone: true,
  imports: [ImportsModule],
})
export class InputSearchComponent { }
