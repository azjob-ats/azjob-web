import { FormControl } from '@angular/forms';
import { InputPrimaryComponent } from '@widget/components/input-primary/input-primary.component';
import { Template } from '@domain/showcase/interfaces/index.interface';

export const componentMap: Template[] = [
  {
    showButtonReset: true,
    showDisabled: true,
    showRequired: true,
    showProperties: true,
    showEmitters: false,
    showPanelStateComponent: false,
    title: 'Input Text Primary',
    description:
      'É um componente gráfico que permite ao usuário insiram dados em um campo de texto. Ele é o princial componente de formulário.',
    codeBlock: [
      {
        title: 'Importação',
        code: `
            import { InputPrimaryComponent } from '@widget/components/input-primary/input-primary.component';
          `,
        language: 'typescript',
      },
      {
        title: 'Exemplo de Uso',
        code: `
            <app-input-primary [formControl]="formControl"[title]="title" [erroFill]="erroFill"[erroRequired]="erroRequired" [isRequired]="isRequired"[isDisabled]="isDisabled"[minLength]="minLength"[maxLength]="maxLength"></app-input-primary>
          `,
        language: 'html',
      },
    ],
    component: {
      name: 'InputPrimaryComponent',
      componentRef: InputPrimaryComponent,
      formControl: new FormControl(''),
      option: {
        title: 'Nome',
        erroFill: 'O nome deve ter no mínimo 2 caracteres.',
        erroRequired: 'O seu nome é obrigatório.',
        minLength: 2,
      },
    },
    properties: [
      {
        name: 'title',
        type: 'string',
        default: 'null',
        description: 'Label of the input',
      },
    ],
    emitters: [],
  },
  {
    showButtonReset: true,
    showDisabled: true,
    showRequired: true,
    showProperties: true,
    showEmitters: false,
    showPanelStateComponent: true,
    title: 'Input Text Secondary',
    description:
      'É um componente gráfico que permite ao usuário insiram dados em um campo de texto. Ele é o princial componente de formulário.',
    codeBlock: [
      {
        title: 'Importação',
        code: `
            import { InputPrimaryComponent } from '@widget/components/input-primary/input-primary.component';
          `,
        language: 'typescript',
      },
      {
        title: 'Exemplo de Uso',
        code: `
            <app-input-primary [formControl]="formControl"[title]="title" [erroFill]="erroFill"[erroRequired]="erroRequired" [isRequired]="isRequired"[isDisabled]="isDisabled"[minLength]="minLength"[maxLength]="maxLength"></app-input-primary>
          `,
        language: 'html',
      },
    ],
    component: {
      name: 'InputSecondaryComponent',
      componentRef: InputPrimaryComponent,
      formControl: new FormControl(''),
      option: {
        title: 'Nome',
        erroFill: 'Por favor, insira um nome válido.',
        erroRequired: 'O seu nome é obrigatório.',
        minLength: 2,
      },
    },
    properties: [
      {
        name: 'title',
        type: 'string',
        default: 'null',
        description: 'Label of the input',
      },
    ],
    emitters: [],
  },
];
