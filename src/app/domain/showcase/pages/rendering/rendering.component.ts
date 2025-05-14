import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { TemplateComponent } from '../templates/template.component';
import { ActivatedRoute } from '@angular/router';
import { CheckboxComponent } from '../components/checkbox/checkbox.component';
import { InputComponent } from '../components/input/input.component';
import { iTemplateComponent } from '@domain/showcase/interfaces/index.interface';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rendering',
  imports: [CommonModule, TemplateComponent],
  templateUrl: './rendering.component.html',
  styleUrl: './rendering.component.scss'
})
export class RenderingComponent implements OnInit {

  public templateRouterComponent: string = '';


  public templete: iTemplateComponent[] = [
    {
      title: 'Input Text Simples',
      description: 'É um componente gráfico que permite ao usuário insiram dados em um campo de texto.',
      codeBlock: [
        {
          title: 'Importação',
          code: `
            import { InputComponent } from "src/app/components/input/input.component";
          `,
          language: 'typescript',
        },
        {
          title: 'Exemplo de Uso',
          code: `
            <app-input [formControl]="formControl"[title]="title"[placeholder]="placeholder"[erroFill]="erroFill"[erroRequired]="erroRequired"[ariaLabel]="ariaLabel"[isRequired]="isRequired"[isDisabled]="isDisabled"[minLength]="minLength"[maxLength]="maxLength"></app-input>
          `,
          language: 'html',
        }
      ],
      component: {
        name: 'InputComponent',
        componentRef: InputComponent,
        formControl: new FormControl(''),
        option: {
          title: 'E-mail',
          placeholder: 'Digite seu e-mail',
          erroFill: "Por favor, insira um e-mail válido.",
          erroRequired: "O e-mail é obrigatório.",
          minLength: 5,
        }
      }
    },
    {
      title: 'Checkbox',
      description: 'É um componente gráfico que permite ao usuário insiram dados em um campo de texto.',
      codeBlock: [
        {
          title: 'Importação',
          code: `
            import { CheckboxComponent } from "src/app/components/checkbox/checkbox.component";
          `,
          language: 'typescript',
        },
        {
          title: 'Exemplo de Uso',
          code: `
            <p-checkbox [formControl]="formControl" [binary]="binary" (onChange)="clickEvent.emit($event)" [disabled]="isDisabled" [required]="isRequired" [attr.aria-label]="ariaLabel"></p-checkbox>
          `,
          language: 'html',
        }
      ],
      component: {
        name: 'CheckboxComponent',
        componentRef: CheckboxComponent,
        formControl: new FormControl(''),
        option: {}
      }
    }
  ]

  constructor(private router: ActivatedRoute) { }
  ngOnInit(): void {
    this.router.url.subscribe(params => {
      this.templateRouterComponent = params[0].path;
    }).unsubscribe()
  }
}
