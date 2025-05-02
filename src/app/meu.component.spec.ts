import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>{{ title }}</h1>
    <button (click)="increment()">Click me</button>
    <button (click)="reset()">Reset</button>
    <p>Count: {{ count }}</p>
  `,
})
export class AppComponent {
  public title = 'My App';
  public count = 0;

  public increment(): void {
    this.count++;
  }

  public reset(): void {
    this.count = 0;
  }
}

describe('AppComponent (standalone)', () => {
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

  it('deve exibir o título na tag h1', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('My App');
  });

  it('deve iniciar o count com 0', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.count).toBe(0);
  });

  it('deve incrementar o count ao clicar no botão', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('p').textContent).toContain('Count: 1');
  });

  it('deve resetar o count ao clicar no botão de reset', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.count = 5; // simula que o count já estava em 5
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[1].click(); // clica no segundo botão (Reset)
    fixture.detectChanges();

    expect(app.count).toBe(0);
    expect(fixture.nativeElement.querySelector('p').textContent).toContain('Count: 0');
  });

  it('deve incrementar múltiplas vezes', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const button = fixture.nativeElement.querySelector('button');

    button.click();
    button.click();
    button.click();
    fixture.detectChanges();

    expect(app.count).toBe(3);
    expect(fixture.nativeElement.querySelector('p').textContent).toContain('Count: 3');
  });
});
