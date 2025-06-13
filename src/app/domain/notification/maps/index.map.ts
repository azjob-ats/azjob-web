export class IndexMap {
    public static toEntity(dto: any[]): any[] {
        return <any[]>dto.map((value) => {
            return {
                language: value.description,
                prefix: value.cod,
            };
        });
    }

    public static toDTO(entity: any[]): any[] {
        return <any[]>entity.map((value) => {
            return {
                description: value.language,
                cod: value.prefix,
            };
        });
    }
}