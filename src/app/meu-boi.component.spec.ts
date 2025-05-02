import { TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>{{ title() }}</h1>
    <button (click)="increment()">Click me</button>
    <button (click)="reset()">Reset</button>
    <p>Count: {{ count() }}</p>
  `,
})
export class AppComponent {
  title = signal('My App');
  count = signal(0);

  increment() {
    this.count.update((c) => c + 1);
  }

  reset() {
    this.count.set(0);
  }
}

describe('AppComponent (with Signals)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('deve criar o componente', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('deve exibir o título', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('My App');
  });

  it('deve começar com count em 0', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.count()).toBe(0);
  });

  it('deve incrementar o count ao clicar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const button = fixture.nativeElement.querySelector('button');

    button.click(); // incrementa
    fixture.detectChanges();

    const app = fixture.componentInstance;
    expect(app.count()).toBe(1);
    expect(fixture.nativeElement.querySelector('p').textContent).toContain(
      'Count: 1',
    );
  });

  it('deve resetar o count', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const buttons = fixture.nativeElement.querySelectorAll('button');

    app.count.set(5);
    fixture.detectChanges();

    buttons[1].click(); // botão "Reset"
    fixture.detectChanges();

    expect(app.count()).toBe(0);
    expect(fixture.nativeElement.querySelector('p').textContent).toContain(
      'Count: 0',
    );
  });
});
