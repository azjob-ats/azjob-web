import { Type } from "@angular/core";
import { FormControl } from "@angular/forms";

export interface iCodeBlock {
  title: string;
  code: string;
  language: string;
}

export interface iComponentConfig {
  name: string;
  componentRef: Type<any>;
  formControl: FormControl
  option: Object;
}

export interface iTemplateComponent {
  title: string;
  description: string;
  codeBlock: iCodeBlock[];
  component: iComponentConfig;
}

