import { Language, LanguageDTO } from '@domain/change-language/interfaces/language.interface';

export class LanguageMap {
  public static toEntity(dto: LanguageDTO[]): Language[] {
    return <Language[]>dto.map(value => {
      return {
        language: value.description,
        prefix: value.cod,
      };
    });
  }

  public static toDTO(entity: Language[]): LanguageDTO[] {
    return <LanguageDTO[]>entity.map(value => {
      return {
        description: value.language,
        cod: value.prefix,
      };
    });
  }
}
