import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputSearchComponent } from './input-search.component';

describe('InputSearchComponent', () => {
    let component: InputSearchComponent;
    let fixture: ComponentFixture<InputSearchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InputSearchComponent], // standalone
        }).compileComponents();

        fixture = TestBed.createComponent(InputSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should render input element with correct attributes and classes', () => {
        const inputEl: HTMLInputElement = fixture.nativeElement.querySelector('input');
        expect(inputEl).toBeTruthy();
        expect(inputEl.type).toBe('text');
        expect(inputEl.placeholder).toBe('Procurar');
        expect(inputEl.id).toBe('firstname');
        expect(inputEl.classList).toContain('w-full');
        expect(inputEl.className).toContain('p-inputtext'); // Classe do PrimeNG
    });
});
