import { Observable, of } from 'rxjs';

export class TransformTitleToUtil {
  public static link(title: string): Observable<string> {
    let linkValido = title.toLowerCase().replace(/\s+/g, '-');
    linkValido = linkValido.replace(/[áàãâä]/g, 'a');
    linkValido = linkValido.replace(/[éèêë]/g, 'e');
    linkValido = linkValido.replace(/[íìîï]/g, 'i');
    linkValido = linkValido.replace(/[óòõôö]/g, 'o');
    linkValido = linkValido.replace(/[úùûü]/g, 'u');
    linkValido = linkValido.replace(/ç/g, 'c');
    const linkSemEspeciais = linkValido.replace(/[^\w-]+/g, '');
    return of(linkSemEspeciais);
  }
}
