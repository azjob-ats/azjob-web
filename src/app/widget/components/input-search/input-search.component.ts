import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input-search',
  template: `
    <input
      type="text"
      pInputText
      id="firstname"
      placeholder="Procurar"
      pSize="large"
      class="w-full"
    />
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
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    InputIconModule,
    IconFieldModule
  ],
})
export class InputSearchComponent { }
