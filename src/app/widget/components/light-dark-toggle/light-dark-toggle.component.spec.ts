import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LightDarkToggleComponent } from './light-dark-toggle.component';
import { CommonModule } from '@angular/common';

describe('LightDarkToggleComponent', () => {
    let fixture: ComponentFixture<LightDarkToggleComponent>;
    let component: LightDarkToggleComponent;

    beforeEach(async () => {
        // Define um estado inicial para a tag <html>
        document.documentElement.className = ''; // limpa classes

        await TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [LightDarkToggleComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LightDarkToggleComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should default to light mode if no dark class present', () => {
        document.documentElement.className = '';
        component.ngOnInit();
        expect(component.modo).toBe('light');
    });

    it('should set to dark mode if html has class "my-app-dark"', () => {
        document.documentElement.className = 'my-app-dark';
        component.ngOnInit();
        expect(component.modo).toBe('dark');
    });

    it('should toggle mode to dark and add class to html', () => {
        component.modo = 'light';
        document.documentElement.className = ''; // começa sem classe
        component.toggleDarkMode('dark');
        expect(component.modo).toBe('dark');
        expect(document.documentElement.classList.contains('my-app-dark')).toBe(true);
    });

    it('should not toggle if mode is the same', () => {
        component.modo = 'dark';
        document.documentElement.className = 'my-app-dark';
        component.toggleDarkMode('dark');
        // modo e classe devem continuar os mesmos
        expect(component.modo).toBe('dark');
        expect(document.documentElement.classList.contains('my-app-dark')).toBe(true);
    });

    it('should toggle mode to light and remove class from html', () => {
        document.documentElement.className = 'my-app-dark';
        component.modo = 'dark';
        component.toggleDarkMode('light');
        expect(component.modo).toBe('light');
        expect(document.documentElement.classList.contains('my-app-dark')).toBe(false);
    });
});
