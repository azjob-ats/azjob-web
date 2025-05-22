import { TestBed } from '@angular/core/testing';
import {
    HttpHandler,
    HttpRequest,
    HttpEvent,
    HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { Observable, of } from 'rxjs';

describe('AuthInterceptor', () => {
    let interceptor: AuthInterceptor<string>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthInterceptor,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true,
                },
            ],
        });

        interceptor = TestBed.inject(AuthInterceptor);
    });

    it('deve ser criado', () => {
        expect(interceptor).toBeTruthy();
    });

    it('não deve modificar a requisição se não houver token', () => {
        const request = new HttpRequest('GET', '/api/test');
        const handler: HttpHandler = {
            handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
                expect(req.headers.has('Authorization')).toBeFalsy();
                return of(); // simula resposta vazia
            },
        };

        interceptor.intercept(request, handler).subscribe();
    });

    it('deve adicionar cabeçalhos se o token estiver presente', () => {
        const request = new HttpRequest('GET', '/api/test');
        const token = 'abc123';

        // Força a configuração manual do cache
        (interceptor as any).cache = token;

        const handler: HttpHandler = {
            handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
                expect(req.headers.get('Authorization')).toBe(`Bearer ${token}`);
                expect(req.headers.get('Accept')).toBe('application/json');
                expect(req.headers.get('Content-Type')).toBe('application/json');
                return of();
            },
        };

        interceptor.intercept(request, handler).subscribe();
    });
});
