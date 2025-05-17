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

export interface Properties {
  name: string;
  type: string;
  default: string;
  description: string;
}

export interface Emitters {
  name: string;
  parameters: string;
  description: string;
}

export interface iTemplateComponent {
  title: string;
  description: string;
  codeBlock: iCodeBlock[];
  component: iComponentConfig;
  showButtonReset: boolean;
  showDisabled: boolean;
  showRequired: boolean;
  showProperties: boolean;
  showEmitters: boolean;
  showPanelStateComponent: boolean;
  properties: Properties[],
  emitters: Emitters[]
}

