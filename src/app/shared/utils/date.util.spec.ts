import { DateUtil } from './date.util';

describe('DateUtil', () => {
  it('deve formatar a data corretamente no formato DD/MM/AAAA', () => {
    const inputDate = new Date(2024, 4, 7); // 7 de maio de 2024 (mês começa em 0)
    const result = DateUtil.getFormattedDate(inputDate);

    expect(result).toBe('7/5/2024');
  });

  it('deve funcionar com datas com dia e mês de um dígito', () => {
    const inputDate = new Date(2025, 0, 1); // 1 de janeiro de 2025
    const result = DateUtil.getFormattedDate(inputDate);

    expect(result).toBe('1/1/2025');
  });

  it('deve retornar uma string', () => {
    const result = DateUtil.getFormattedDate(new Date());
    expect(typeof result).toBe('string');
  });
});
