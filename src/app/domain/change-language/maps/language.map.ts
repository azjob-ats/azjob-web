import { iLanguage } from '../interfaces/language.interface';

interface LanguageDTO {
  description: string;
  cod: string;
}

export class LanguageMap {
  public static toEntity(dto: LanguageDTO[]): iLanguage[] {
    return <iLanguage[]>dto.map(value => {
      return {
        language: value.description,
        prefix: value.cod,
      };
    });
  }

  public static toDTO(entity: iLanguage[]): LanguageDTO[] {
    return <LanguageDTO[]>entity.map(value => {
      return {
        description: value.language,
        cod: value.prefix,
      };
    });
  }
}
