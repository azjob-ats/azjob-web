interface Dto {
  description: string;
  cod: string;
}

interface Entity {
  language: string;
  prefix: string;
}

export class IndexMap {
  public static toEntity(dto: Dto[]): Entity[] {
    return dto.map(value => {
      return {
        language: value.description,
        prefix: value.cod,
      };
    });
  }

  public static toDTO(entity: Entity[]): Dto[] {
    return entity.map(value => {
      return {
        description: value.language,
        cod: value.prefix,
      };
    });
  }
}
