import { iLanguage } from '../interfaces/language.interface';
import { LanguageMap } from './language.map';

interface LanguageDTO {
  description: string;
  cod: string;
}

describe('LanguageMap', () => {
  const dtoMock: LanguageDTO[] = [
    { description: 'Inglês', cod: 'EN' },
    { description: 'Português', cod: 'PT' },
  ];

  const entityMock: iLanguage[] = [
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
