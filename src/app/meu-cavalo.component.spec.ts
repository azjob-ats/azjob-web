import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

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
export class AppComponent implements OnInit {
  private http = inject(HttpClient);
  public users$!: Observable<any[]>;

  public ngOnInit(): void {
    this.users$ = this.http.get<any[]>('/api/users');
  }

  public addUser(): void {
    this.http.post('/api/users', { name: 'Novo Usuário' }).subscribe();
  }
}

describe('AppComponent (RxJS)', () => {
  let httpClientMock: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn(),
      post: jest.fn(),
    } as Partial<jest.Mocked<HttpClient>> as jest.Mocked<HttpClient>;
    TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientModule],
      providers: [{ provide: HttpClient, useValue: httpClientMock }],
    });
  });

  it('deve buscar usuários com GET', () => {
    const fakeUsers = [{ name: 'João' }, { name: 'Maria' }];
    httpClientMock.get.mockReturnValue(of(fakeUsers));

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const liElements = fixture.nativeElement.querySelectorAll('li');
    expect(liElements.length).toBe(2);
    expect(liElements[0].textContent).toContain('João');
    expect(httpClientMock.get).toHaveBeenCalledWith('/api/users');
  });

  it('deve enviar POST ao adicionar usuário', () => {
    httpClientMock.get.mockReturnValue(of([]));
    httpClientMock.post.mockReturnValue(of({}));

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(httpClientMock.post).toHaveBeenCalledWith('/api/users', {
      name: 'Novo Usuário',
    });
  });
});
