import { CommonModule } from '@angular/common';
import { Component, ComponentRef, Input, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormControl } from '@angular/forms';
import { CodeBlockComponent } from '../components/code-block/code-block.component';
import { iCodeBlock } from '@domain/showcase/interfaces/index.interface';
import { JsonHighlightDirective } from '@widget/directives/json-highlight.directive';

@Component({
    selector: 'app-template',
    templateUrl: './template.component.html',
    styleUrls: ['./template.component.scss'],
    imports: [
        CommonModule,
        ButtonModule,
        CodeBlockComponent,
        JsonHighlightDirective
    ]
})
export class TemplateComponent {
    @Input() public componentOption: Object = {};
    @Input() public componentFormControl: FormControl | null = null;
    @Input() public codeBlock: iCodeBlock[] = [];
    @Input() public componentName: string = '';
    @Input() public componentDescription: string = '';
    @Input() public componentPath: string = '';
    @Input() public componentCode: string = '';
    @Input() public dynamicComponent!: Type<any>;
    @ViewChild('dynamicComponent', { read: ViewContainerRef, static: true }) public container!: ViewContainerRef;

    public componentRef: any;
    public componentState = {
        value: '',
        disabled: false,
        required: false
    };

    public ngOnInit(): void {
        this.renderComponent(this.dynamicComponent);
    }

    public renderComponent(component: Type<any>) {
        this.container.clear();
        const componentRef = this.createComponent(component, {
            ...{ formControl: this.componentFormControl },
            ...this.componentOption
        });
        this.componentRef = componentRef

        return componentRef;
    }

    public createComponent<T>(component: Type<T>, inputs: Partial<T>): ComponentRef<T> {
        const componentRef: any = this.container.createComponent(component);
        Object.assign(componentRef.instance, inputs);
        componentRef.changeDetectorRef.detectChanges();

        componentRef.instance.formControl.valueChanges.subscribe((value: any) => {
            this.componentState = {
                value: componentRef.instance.formControl.value,
                disabled: componentRef.instance.isDisabled,
                required: componentRef.instance.isRequired
            }
        })
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