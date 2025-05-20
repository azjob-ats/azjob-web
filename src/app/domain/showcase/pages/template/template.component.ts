import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ImportsModule } from '@core/imports';
import { SelectLangComponent } from '@domain/change-language/components/select-lang/select-lang.component';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingSpinnerDirective } from '@widget/directives/loading-spinner.directive';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-template',
  imports: [ImportsModule, LoadingSpinnerDirective, TranslateModule, SelectLangComponent],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss',
})
export class TemplateComponent implements OnInit {
  public title = 'azjob-web';
  public name = environment.APP_NAME;
  public production = environment.production;
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
