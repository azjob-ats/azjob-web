export class TypeObjectUtil {
  public static setValue(value: any) {
    try {
      // Tentativa de converter JSON válido para objeto, array ou número
      const parsed = JSON.parse(value);

      // Se for um array, retorna o array
      if (Array.isArray(parsed)) return parsed;

      // Se for um objeto, retorna o objeto
      if (typeof parsed === 'object' && parsed !== null) return parsed;

      // Se for um número, retorna como número
      if (typeof parsed === 'number') return parsed;
    } catch (error) {
      // Caso JSON.parse falhe, continua para outras verificações
    }

    // Tenta converter para número se não foi possível com JSON.parse
    if (!isNaN(value)) return Number(value);

    // Tenta converter para função
    try {
      const func = new Function(`return (${value})`);
      if (typeof func() === 'function') return func();
    } catch (error) {
      // Caso não seja uma função válida, ignora
    }

    // Tenta converter para Date
    const date = new Date(value);
    if (!isNaN(date.getTime())) return date;

    // Se não for nenhum dos casos, retorna a string original
    return value;
  }

  public static getType(value: any): string {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    if (value instanceof Date) return 'date';
    if (value instanceof Function) return 'function';
    return typeof value; // Retorna 'string', 'number', 'boolean', 'object', etc.
  }
}
