import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

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
export class AppComponent2 {
  public title = signal('My App');
  public count = signal(0);

  public increment(): void {
    this.count.update(c => c + 1);
  }

  public reset(): void {
    this.count.set(0);
  }
}

describe('AppComponent (with Signals)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent2],
    }).compileComponents();
  });

  it('deve criar o componente', () => {
    const fixture = TestBed.createComponent(AppComponent2);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('deve exibir o título', () => {
    const fixture = TestBed.createComponent(AppComponent2);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('My App');
  });

  it('deve começar com count em 0', () => {
    const fixture = TestBed.createComponent(AppComponent2);
    const app = fixture.componentInstance;
    expect(app.count()).toBe(0);
  });

  it('deve incrementar o count ao clicar', () => {
    const fixture = TestBed.createComponent(AppComponent2);
    const button = fixture.nativeElement.querySelector('button');

    button.click(); // incrementa
    fixture.detectChanges();

    const app = fixture.componentInstance;
    expect(app.count()).toBe(1);
    expect(fixture.nativeElement.querySelector('p').textContent).toContain('Count: 1');
  });

  it('deve resetar o count', () => {
    const fixture = TestBed.createComponent(AppComponent2);
    const app = fixture.componentInstance;
    const buttons = fixture.nativeElement.querySelectorAll('button');

    app.count.set(5);
    fixture.detectChanges();

    buttons[1].click(); // botão "Reset"
    fixture.detectChanges();

    expect(app.count()).toBe(0);
    expect(fixture.nativeElement.querySelector('p').textContent).toContain('Count: 0');
  });
});

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  template: `
    <h1>Usuários</h1>
    <ul>
      <li *ngFor="let user of users$ | async">{{ user.name }}</li>
    </ul>
    <button (click)="addUser()">Adicionar Usuário</button>
  `,
})
export class AppComponent3 implements OnInit {
  private http = inject(HttpClient);
  public users$!: Observable<any[]>;

  public ngOnInit(): void {
    this.users$ = this.http.get<any[]>('/api/users');
  }

  public addUser(): void {
    this.http.post('/api/users', { name: 'Novo Usuário' }).subscribe();
  }
}

describe('AppComponent3 (RxJS)', () => {
  let httpClientMock: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn(),
      post: jest.fn(),
    } as Partial<jest.Mocked<HttpClient>> as jest.Mocked<HttpClient>;
    TestBed.configureTestingModule({
      imports: [AppComponent3, HttpClientModule],
      providers: [{ provide: HttpClient, useValue: httpClientMock }],
    });
  });

  it('deve buscar usuários com GET', () => {
    const fakeUsers = [{ name: 'João' }, { name: 'Maria' }];
    httpClientMock.get.mockReturnValue(of(fakeUsers));

    const fixture = TestBed.createComponent(AppComponent3);
    fixture.detectChanges();

    const liElements = fixture.nativeElement.querySelectorAll('li');
    expect(liElements.length).toBe(2);
    expect(liElements[0].textContent).toContain('João');
    expect(httpClientMock.get).toHaveBeenCalledWith('/api/users');
  });

  it('deve enviar POST ao adicionar usuário', () => {
    httpClientMock.get.mockReturnValue(of([]));
    httpClientMock.post.mockReturnValue(of({}));

    const fixture = TestBed.createComponent(AppComponent3);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(httpClientMock.post).toHaveBeenCalledWith('/api/users', {
      name: 'Novo Usuário',
    });
  });
});

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
export class AppComponent4 {
  public title = 'My App';
  public count = 0;

  public increment(): void {
    this.count++;
  }

  public reset(): void {
    this.count = 0;
  }
}

describe('AppComponent4 (standalone)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent4],
    }).compileComponents();
  });

  it('deve criar o componente', () => {
    const fixture = TestBed.createComponent(AppComponent4);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('deve exibir o título na tag h1', () => {
    const fixture = TestBed.createComponent(AppComponent4);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('My App');
  });

  it('deve iniciar o count com 0', () => {
    const fixture = TestBed.createComponent(AppComponent4);
    const app = fixture.componentInstance;
    expect(app.count).toBe(0);
  });

  it('deve incrementar o count ao clicar no botão', () => {
    const fixture = TestBed.createComponent(AppComponent4);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('p').textContent).toContain('Count: 1');
  });

  it('deve resetar o count ao clicar no botão de reset', () => {
    const fixture = TestBed.createComponent(AppComponent4);
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
    const fixture = TestBed.createComponent(AppComponent4);
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
