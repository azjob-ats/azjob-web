import { FormControl } from '@angular/forms';

export interface iLanguage {
  language: string;
  prefix: string;
}

export interface iSelection {
  description: string;
  cod: string;
}

export interface iSelectOption {
  formControl: FormControl<any>;
  selectEmpy: string;
  requiredField: boolean;
  disableField: boolean;
  selections: iSelection[];
}
