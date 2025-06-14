import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-light-dark-toggle',
  imports: [CommonModule],
  templateUrl: './light-dark-toggle.component.html',
  styleUrl: './light-dark-toggle.component.scss',
})
export class LightDarkToggleComponent implements OnInit {
  public modo: string = 'light';

  public ngOnInit(): void {
    const element: any = document.querySelector('html');
    if (element.classList[0]) {
      if (element.classList[0] === 'my-app-dark') {
        this.modo = 'dark';
      } else {
        this.modo = 'light';
      }
    }
  }

  public toggleDarkMode(modo: string): void {
    if (modo === this.modo) {
      return;
    }

    this.modo = modo;
    const element: any = document.querySelector('html');
    element.classList.toggle('my-app-dark');
  }
}
