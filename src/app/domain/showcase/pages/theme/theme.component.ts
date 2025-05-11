import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ImportsModule } from '@core/imports';
import { LoadingSpinnerDirective } from '@widget/directives/loading-spinner.directive';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-theme',
  imports: [ImportsModule, LoadingSpinnerDirective],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss',
})
export class ThemeComponent implements OnInit {
  public title = 'azjob-web';
  public ambiente = environment.env;
  public checked: boolean = false;
  public animations = ['fadein'];
  public animation = 'animation-duration: 75ms';
  public isDisabled = false;
  public isLoading = false;
  public isLoading2 = false;
  public toggleDarkMode(): void {
    const element: any = document.querySelector('html');
    element.classList.toggle('my-app-dark');
  }

  public ngOnInit(): void {
    this.formGroup = new FormGroup({
      value: new FormControl('on'),
    });

    const element: any = document.querySelector('html');
    element.classList.toggle('my-app-dark');
  }

  public formGroup!: FormGroup;

  public stateOptions: any[] = [
    { label: 'Off', value: 'off' },
    { label: 'On', value: 'on' },
  ];

  public value!: any;

  public paymentOptions: any[] = [
    { name: 'Option 1', value: 1 },
    { name: 'Option 2', value: 2 },
    { name: 'Option 3', value: 3 },
  ];

  public setLoad() {
    this.isLoading2 = !this.isLoading2;

    setTimeout(() => {
      this.isLoading2 = !this.isLoading2;
    }, 3000);
  }
}
