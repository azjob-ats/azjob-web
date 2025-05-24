import { Language, LanguageDTO } from '@domain/change-language/interfaces/language.interface';
import { LanguageMap } from '@domain/change-language/maps/language.map';

describe('LanguageMap', () => {
  const dtoMock: LanguageDTO[] = [
    { description: 'Inglês', cod: 'EN' },
    { description: 'Português', cod: 'PT' },
  ];

  const entityMock: Language[] = [
    { language: 'Inglês', prefix: 'EN' },
    { language: 'Português', prefix: 'PT' },
  ];

  describe('toEntity', () => {
    it('deve converter um array de DTOs para um array de iLanguage', () => {
      const result = LanguageMap.toEntity(dtoMock);

      expect(result).toEqual(entityMock);
    });

    it('deve retornar um array vazio se o DTO estiver vazio', () => {
      const result = LanguageMap.toEntity([]);

      expect(result).toEqual([]);
    });
  });

  describe('toDTO', () => {
    it('deve converter um array de iLanguage para um array de DTOs', () => {
      const result = LanguageMap.toDTO(entityMock);

      expect(result).toEqual(dtoMock);
    });

    it('deve retornar um array vazio se o array de entidades estiver vazio', () => {
      const result = LanguageMap.toDTO([]);

      expect(result).toEqual([]);
    });
  });
});
