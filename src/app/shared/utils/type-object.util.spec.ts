import { TypeObjectUtil } from './type-object.util';

describe('TypeObjectUtil', () => {
  describe('setValue', () => {
    it('deve retornar objeto a partir de JSON', () => {
      const result = TypeObjectUtil.setValue('{"nome": "João"}');
      expect(result).toEqual({ nome: 'João' });
    });

    it('deve retornar array a partir de JSON', () => {
      const result = TypeObjectUtil.setValue('[1, 2, 3]');
      expect(result).toEqual([1, 2, 3]);
    });

    it('deve retornar número a partir de JSON', () => {
      const result = TypeObjectUtil.setValue('42');
      expect(result).toBe(42);
    });

    it('deve retornar número a partir de string numérica', () => {
      const result = TypeObjectUtil.setValue('123');
      expect(result).toBe(123);
    });

    it('deve retornar Date a partir de string válida de data', () => {
      const dateString = '2023-12-25T00:00:00.000Z';
      const result = TypeObjectUtil.setValue(dateString);
      expect(result instanceof Date).toBeTruthy();
      expect(result.toISOString()).toBe(dateString);
    });

    it('deve retornar função a partir de string', () => {
      const funcString = 'function() { return 123; }';
      const result = TypeObjectUtil.setValue(funcString);
      expect(typeof result).toBe('function');
      expect(result()).toBe(123);
    });

    it('deve retornar string original se não for nenhum caso conhecido', () => {
      const value = 'texto aleatório';
      const result = TypeObjectUtil.setValue(value);
      expect(result).toBe(value);
    });
  });

  describe('getType', () => {
    it('deve retornar "null" para null', () => {
      expect(TypeObjectUtil.getType(null)).toBe('null');
    });

    it('deve retornar "array" para arrays', () => {
      expect(TypeObjectUtil.getType([1, 2, 3])).toBe('array');
    });

    it('deve retornar "date" para instâncias de Date', () => {
      expect(TypeObjectUtil.getType(new Date())).toBe('date');
    });

    it('deve retornar "function" para funções', () => {
      expect(TypeObjectUtil.getType(() => {})).toBe('function');
    });

    it('deve retornar "string", "number", "boolean" etc.', () => {
      expect(TypeObjectUtil.getType('teste')).toBe('string');
      expect(TypeObjectUtil.getType(42)).toBe('number');
      expect(TypeObjectUtil.getType(true)).toBe('boolean');
      expect(TypeObjectUtil.getType({})).toBe('object');
    });
  });
});
