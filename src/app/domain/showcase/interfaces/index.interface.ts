import { Type } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface CodeBlock {
  title: string;
  code: string;
  language: string;
}

export interface ComponentConfig {
  name: string;
  componentRef: Type<any>;
  formControl: FormControl;
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

export interface Template {
  title: string;
  description: string;
  codeBlock: CodeBlock[];
  component: ComponentConfig;
  showButtonReset: boolean;
  showDisabled: boolean;
  showRequired: boolean;
  showProperties: boolean;
  showEmitters: boolean;
  showPanelStateComponent: boolean;
  properties: Properties[];
  emitters: Emitters[];
}

export interface Column {
  field: string;
  header: string;
}
