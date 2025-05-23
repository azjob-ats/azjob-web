import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JsonHighlightDirective } from './json-highlight.directive';
import { By } from '@angular/platform-browser';

@Component({
  standalone: true,
  template: '<pre [jsonData]="data" appJsonHighlight></pre>',
  imports: [JsonHighlightDirective],
})
class TestComponent {
  public data = {
    name: 'John',
    age: 30,
    active: true,
    address: null,
  };
}

describe('JsonHighlightDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let preElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    preElement = fixture.debugElement.query(By.css('pre'));
  });

  it('deve criar a diretiva', () => {
    const directiveInstance = preElement.injector.get(JsonHighlightDirective);
    expect(directiveInstance).toBeTruthy();
  });

  it('deve aplicar o destaque corretamente no JSON', () => {
    const html = preElement.nativeElement.innerHTML;
    expect(html).toBeTruthy();
  });
});
