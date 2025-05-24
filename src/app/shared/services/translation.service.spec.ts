import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ResponseStatusCode } from '@shared/enums/response-status-code.enum';
import { TranslationStatusCodeService } from './translation.service';

describe('TranslationStatusCodeService', () => {
  let service: TranslationStatusCodeService;
  let httpMock: HttpTestingController;

  const mockTranslations = {
    'NOTE.SUCCESS': 'Operação realizada com sucesso',
    'NOTE.ERROR': 'Erro inesperado',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TranslationStatusCodeService],
    });

    service = TestBed.inject(TranslationStatusCodeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que não há requisições pendentes
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve carregar traduções e armazená-las', done => {
    service.loadTranslations().subscribe(() => {
      expect((service as any).translations['NOTE.SUCCESS']).toBe('Operação realizada com sucesso');
      done();
    });

    const req = httpMock.expectOne('i18n/pt-BR.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockTranslations);
  });

  it('deve retornar tradução existente', () => {
    // Simula que as traduções já foram carregadas
    (service as any).translations = mockTranslations;

    const result = service.getTranslation(ResponseStatusCode.SUCCESSFULLY_CREATED);
    expect(result).toBe('successfully_created');
  });

  it('deve retornar a chave original se não houver tradução', () => {
    (service as any).translations = mockTranslations;

    const result = service.getTranslation(ResponseStatusCode.ERROR_GENERIC); // Suponha que essa não exista
    expect(result).toBe(ResponseStatusCode.ERROR_GENERIC);
  });
});
