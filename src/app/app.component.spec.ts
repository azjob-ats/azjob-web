import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{ title }}</h1>
    <button (click)="increment()">Click me</button>
    <p>Count: {{ count }}</p>
  `,
})
export class AppComponent {
  public title = 'My App';
  public count = 0;

  public increment(): void {
    this.count++;
  }
}

import { TestBed } from '@angular/core/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent], // porque é standalone
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should display the title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('My App');
  });

  it('should increment count on button click', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const button = fixture.nativeElement.querySelector('button');

    // Teste inicial
    expect(app.count).toBe(0);

    // Simula o clique
    button.click();
    fixture.detectChanges();

    // Verifica se incrementou
    expect(app.count).toBe(1);
    expect(fixture.nativeElement.querySelector('p').textContent).toContain('Count: 1');
  });
});
