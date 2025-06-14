import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputSecondaryComponent } from './input-secondary.component'; // ajuste o caminho se necessário
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('InputSecondaryComponent', () => {
    let component: InputSecondaryComponent;
    let fixture: ComponentFixture<InputSecondaryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InputSecondaryComponent, ReactiveFormsModule],
        }).compileComponents();

        fixture = TestBed.createComponent(InputSecondaryComponent);
        component = fixture.componentInstance;

        // Setup inicial
        component.title = 'Nome';
        component.erroRequired = 'Campo obrigatório';
        component.erroFill = 'Preencha corretamente';
        component.minLength = 3;
        component.maxLength = 10;
        component.isRequired = true;
        component.isDisabled = false;
        component.formControl = new FormControl('', []); // inicia vazio

        fixture.detectChanges();
    });

    it('deve criar o componente', () => {
        expect(component).toBeTruthy();
    });

    it('deve aplicar os validadores corretamente no ngOnInit', () => {
        component.ngOnInit();
        fixture.detectChanges();

        component.formControl.setValue('');
        component.formControl.markAsTouched();
        fixture.detectChanges();

        //expect(component.formControl.hasError('required')).toBeTrue();

        component.formControl.setValue('a');
        fixture.detectChanges();
        expect(component.formControl.hasError('minlength')).toBeTruthy();

        component.formControl.setValue('12345678901'); // 11 caracteres
        fixture.detectChanges();
        expect(component.formControl.hasError('maxlength')).toBeTruthy();
    });

    it('deve exibir mensagem de erro "required"', () => {
        component.ngOnInit();
        component.formControl.markAsTouched();
        fixture.detectChanges();

        const errorEl = fixture.debugElement.query(By.css('.err-small'));
        expect(errorEl.nativeElement.textContent).toContain('Campo obrigatório');
    });

    it('deve resetar para o estado inicial com resetToInitialState()', () => {
        component.ngOnInit();
        component.formControl.setValue('Teste');
        component.formControl.markAsTouched();

        component.resetToInitialState();
        fixture.detectChanges();

        expect(component.formControl.value).toBe('');
        expect(component.formControl.touched).toBeFalsy();
    });

    it('deve desabilitar o campo com disable()', () => {
        component.ngOnInit();
        component.disable();
        fixture.detectChanges();

        expect(component.formControl.disabled).toBeTruthy();
    });

    it('deve habilitar o campo com enable()', () => {
        component.ngOnInit();
        component.disable(); // desabilita
        component.enable(); // reabilita
        fixture.detectChanges();

        expect(component.formControl.disabled).toBeFalsy();
    });
});
