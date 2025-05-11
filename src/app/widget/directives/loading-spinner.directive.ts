import {
    Directive,
    ElementRef,
    Input,
    Renderer2,
    OnChanges,
    AfterViewInit
} from '@angular/core';

@Directive({
    selector: '[appLoadingSpinner]'
})
export class LoadingSpinnerDirective implements OnChanges, AfterViewInit {
    @Input('appLoadingSpinner') loading: boolean = false;
    private buttonElement: HTMLButtonElement | null = null;

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngAfterViewInit() {
        // Encontrar o <button> dentro do <p-button>
        this.buttonElement = this.el.nativeElement.querySelector('button');

        if (this.loading) {
            this.addSpinner();
        }
    }

    ngOnChanges() {
        if (this.buttonElement) {
            if (this.loading) {
                this.addSpinner();
            } else {
                this.removeSpinner();
            }
        }
    }

    private addSpinner() {
        if (!this.buttonElement) return;

        this.renderer.setAttribute(this.buttonElement, 'disabled', 'true');

        // Verifica se o spinner já existe
        const existingSpinner = this.buttonElement.querySelector('.spinner-icon');
        if (!existingSpinner) {
            const spinner = this.renderer.createElement('i');
            this.renderer.addClass(spinner, 'pi');
            this.renderer.addClass(spinner, 'pi-spin');
            this.renderer.addClass(spinner, 'pi-spinner');
            this.renderer.addClass(spinner, 'spinner-icon');
            this.renderer.setStyle(spinner, 'font-size', '2rem');
            this.renderer.setStyle(spinner, 'position', 'absolute');
            this.renderer.setStyle(spinner, 'font-weight', 'bold');

            this.renderer.appendChild(this.buttonElement, spinner);
        }
    }

    private removeSpinner() {
        if (!this.buttonElement) return;

        this.renderer.removeAttribute(this.buttonElement, 'disabled');

        const spinner = this.buttonElement.querySelector('.spinner-icon');
        if (spinner) {
            this.renderer.removeChild(this.buttonElement, spinner);
        }
    }
}
