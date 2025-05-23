import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoadingSpinnerDirective } from './loading-spinner.directive'; // ajuste o caminho conforme necessário
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  template: `
    <p-button
      label="Novo usuario"
      severity="info"
      styleClass="w-full h-full"
      [appLoadingSpinner]="isLoading"
    />
  `,
  imports: [LoadingSpinnerDirective, ButtonModule, CommonModule],
})
class TestComponent {
  public loading = false;
}

describe('LoadingSpinnerDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let directiveInstance: LoadingSpinnerDirective;
  let buttonDebugEl: DebugElement;
  let nativeButton: HTMLButtonElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent, LoadingSpinnerDirective],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    buttonDebugEl = fixture.debugElement.query(By.css('button'));
    nativeButton = buttonDebugEl.nativeElement;
    directiveInstance = buttonDebugEl.injector.get(LoadingSpinnerDirective);
  });

  it('should create the directive instance', () => {
    component.loading = true;
    expect(directiveInstance).toBeTruthy();
  });

  it('deve adicionar o spinner quando loading for true via [ngOnChanges]', () => {
    const directiveInstance = buttonDebugEl.injector.get(LoadingSpinnerDirective);
    directiveInstance.loading = true;
    directiveInstance.ngOnChanges();
    const spinner = fixture.nativeElement.querySelector('.spinner-icon');
    expect(nativeButton.hasAttribute('disabled')).toBe(true);
    expect(spinner).toBeTruthy();
  });

  it('deve remover o spinner quando loading for false após ter sido true', () => {
    const directiveInstance = buttonDebugEl.injector.get(LoadingSpinnerDirective);
    directiveInstance.loading = true;
    directiveInstance.ngOnChanges();

    directiveInstance['removeSpinner']();

    const spinner = nativeButton.querySelector('.spinner-icon');
    expect(nativeButton.hasAttribute('disabled')).toBe(false);
    expect(spinner).toBeNull();
  });

  it('Não deve remover o spinner quando buttonElement null', () => {
    const directiveInstance = buttonDebugEl.injector.get(LoadingSpinnerDirective);
    directiveInstance.loading = true;
    directiveInstance.ngOnChanges();

    directiveInstance['buttonElement'] = null;
    directiveInstance['removeSpinner']();

    const spinner = fixture.nativeElement.querySelector('.spinner-icon');
    expect(nativeButton.hasAttribute('disabled')).toBe(true);
    expect(spinner).toBeTruthy();
  });

  it('Não deve adicionar o spinner quando buttonElement null', () => {
    const directiveInstance = buttonDebugEl.injector.get(LoadingSpinnerDirective);
    directiveInstance.loading = true;

    directiveInstance['buttonElement'] = null;
    directiveInstance['addSpinner']();

    const spinner = nativeButton.querySelector('.spinner-icon');
    expect(spinner).toBeNull();
  });

  it('deve remover o spinner quando loading for false', () => {
    const directiveInstance = buttonDebugEl.injector.get(LoadingSpinnerDirective);
    directiveInstance.loading = false;

    directiveInstance.ngOnChanges();
    const spinner = nativeButton.querySelector('.spinner-icon');
    expect(spinner).toBeNull();
  });

  it('deve adicionar o spinner quando loading for true via [ngAfterViewInit]', () => {
    const directiveInstance = buttonDebugEl.injector.get(LoadingSpinnerDirective);
    directiveInstance.loading = true;
    directiveInstance.ngAfterViewInit();
    const spinner = fixture.nativeElement.querySelector('.spinner-icon');
    expect(nativeButton.hasAttribute('disabled')).toBe(true);
    expect(spinner).toBeTruthy();
  });
});
