import { CommonModule } from '@angular/common';
import { Component, ComponentRef, Input, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Emitters, iCodeBlock, Properties } from '@domain/showcase/interfaces/index.interface';
import { JsonHighlightDirective } from '@widget/directives/json-highlight.directive';
import { ButtonModule } from 'primeng/button';
import { CodeBlockComponent } from '../../components/code-block/code-block.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-page-document',
  templateUrl: './page-document.component.html',
  styleUrl: './page-document.component.scss',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TagModule,
    CodeBlockComponent,
    JsonHighlightDirective,
  ],
})
export class PageDocumentComponent {
  @Input() public componentOption: Object = {};
  @Input() public componentFormControl: FormControl | null = null;
  @Input() public codeBlock: iCodeBlock[] = [];
  @Input() public componentName: string = '';
  @Input() public componentDescription: string = '';
  @Input() public componentPath: string = '';
  @Input() public componentCode: string = '';
  @Input() public showButtonReset: boolean = true;
  @Input() public showRequired: boolean = true;
  @Input() public showDisabled: boolean = true;
  @Input() public showProperties: boolean = true;
  @Input() public showEmitters: boolean = true;
  @Input() public showPanelStateComponent: boolean = true;
  @Input() public dynamicComponent!: Type<any>;
  @ViewChild('dynamicComponent', { read: ViewContainerRef, static: true })
  public container!: ViewContainerRef;
  @Input() public properties: Properties[] = [];
  @Input() public emitters: Emitters[] = [];
  public componentRef: any;
  public componentState = {
    value: '',
    disabled: false,
    required: false,
  };

  public colsProperties!: Column[];
  public colsEmitters!: Column[];

  public ngOnInit(): void {
    this.renderComponent(this.dynamicComponent);

    this.colsProperties = [
      { field: 'name', header: 'Name' },
      { field: 'type', header: 'Type' },
      { field: 'default', header: 'Default' },
      { field: 'description', header: 'Description' },
    ];

    this.colsEmitters = [
      { field: 'name', header: 'Name' },
      { field: 'parameters', header: 'Parameters' },
      { field: 'description', header: 'Description' },
    ];
  }

  public renderComponent(component: Type<any>) {
    this.container.clear();
    const componentRef = this.createComponent(component, {
      ...{ formControl: this.componentFormControl },
      ...this.componentOption,
    });
    this.componentRef = componentRef;

    return componentRef;
  }

  public createComponent<T>(component: Type<T>, inputs: Partial<T>): ComponentRef<T> {
    const componentRef: any = this.container.createComponent(component);
    Object.assign(componentRef.instance, inputs);
    componentRef.changeDetectorRef.detectChanges();

    componentRef.instance.formControl.valueChanges.subscribe(() => {
      this.componentState = {
        value: componentRef.instance.formControl.value,
        disabled: componentRef.instance.isDisabled,
        required: componentRef.instance.isRequired,
      };
    });
    return componentRef;
  }

  public reset() {
    this.componentRef.instance.formControl.reset();
  }

  public toggleDisable() {
    this.componentRef.instance.isDisabled = !this.componentRef.instance.isDisabled;
    this.componentRef.instance.ngOnInit();
  }

  public toggleRequired() {
    this.componentRef.instance.isRequired = !this.componentRef.instance.isRequired;
    this.componentRef.instance.ngOnInit();
  }
}
