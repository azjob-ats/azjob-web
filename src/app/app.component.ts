import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImportsModule } from '@core/imports';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ImportsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public title = 'azjob-web';
  public value: string = '';
  public checked: boolean = false;
  public animations = ['fadein'];
  public animation = 'animation-duration: 75ms';
  public toggleDarkMode(): void {
    const element: any = document.querySelector('html');
    element.classList.toggle('my-app-dark');
  }

  public ngOnInit(): void {}
}
