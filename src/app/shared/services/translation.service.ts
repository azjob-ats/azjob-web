import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { eResponseStatusCode } from '@shared/enums/response-status-code.enum';

@Injectable({
  providedIn: 'root',
})
export class TranslationStatusCodeService {
  private translations: { [key: string]: string } = {};
  private http = inject(HttpClient);

  public loadTranslations(): Observable<void> {
    return this.http
      .get<{ [key: string]: string }>('i18n/pt-BR.json')
      .pipe(
        map((data) => {
          this.translations = data;
        })
      );
  }

  public getTranslation(key: eResponseStatusCode): string {
    return this.translations[`NOTE.${key}`] || key;
  }
}
