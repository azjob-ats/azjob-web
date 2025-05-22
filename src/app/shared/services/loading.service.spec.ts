import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService],
    });

    service = TestBed.inject(LoadingService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve definir loading como true ao chamar start()', () => {
    service.start();
    // Acesso interno ao signal por verificação direta (não ideal, mas necessário se não houver getter)
    expect((service as any).loading()).toBeTruthy();
  });

  it('deve definir loading como false ao chamar stop()', () => {
    service.start(); // Primeiro ativa
    service.stop();  // Depois desativa
    expect((service as any).loading()).toBeFalsy();
  });
});
