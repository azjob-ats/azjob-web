import { IndexMap } from './index.map';

describe('IndexMap', () => {
  describe('toEntity', () => {
    it('should map dto array to entity array', () => {
      const dto = [
        { description: 'English', cod: 'EN' },
        { description: 'Portuguese', cod: 'PT' },
      ];

      const expected = [
        { language: 'English', prefix: 'EN' },
        { language: 'Portuguese', prefix: 'PT' },
      ];

      const result = IndexMap.toEntity(dto);

      expect(result).toEqual(expected);
    });
  });

  describe('toDTO', () => {
    it('should map entity array to dto array', () => {
      const entity = [
        { language: 'Spanish', prefix: 'ES' },
        { language: 'French', prefix: 'FR' },
      ];

      const expected = [
        { description: 'Spanish', cod: 'ES' },
        { description: 'French', cod: 'FR' },
      ];

      const result = IndexMap.toDTO(entity);

      expect(result).toEqual(expected);
    });
  });
});
