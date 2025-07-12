export class IndexMap {
  public static toEntity(dto: LanguageDTO[]): Language[] {
    return dto.map(value => {
      return {
        language: value.description,
        prefix: value.cod,
      };
    });
  }

  public static toDTO(entity: Language[]): LanguageDTO[] {
    return entity.map(value => {
      return {
        description: value.language,
        cod: value.prefix,
      };
    });
  }
}
