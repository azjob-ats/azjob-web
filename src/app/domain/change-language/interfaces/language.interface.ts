import { FormControl } from '@angular/forms';

export interface Language {
  language: string;
  prefix: string;
}

export interface Selection {
  description: string;
  cod: string;
}

export interface SelectOption {
  formControl: FormControl<unknown>;
  selectEmpy: string;
  requiredField: boolean;
  disableField: boolean;
  selections: Selection[];
}

export interface LanguageDTO {
  description: string;
  cod: string;
}
