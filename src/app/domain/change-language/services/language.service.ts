import { inject, Injectable } from '@angular/core';
import { delay, last, Observable, switchMap, take, tap } from 'rxjs';
import { LanguageApiMockservice } from '@domain/change-language/mocks/language.api.mock';
import { Language } from '@domain/change-language/interfaces/language.interface';
import { LanguageCacheService } from '@domain/change-language/caches/language.cache';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private api: LanguageApiMockservice = inject(LanguageApiMockservice);
  private cache: LanguageCacheService = inject(LanguageCacheService);

  public getAllLanguage(): Observable<Language[]> {
    return this.api.getAllLanguage();
  }

  public getLanguage(): Observable<Language> {
    return this.cache.results().pipe(
      switchMap(lang => {
        if (lang.length > 0) {
          return lang;
        }
        return this.api.getLanguage();
      }),
      take(1)
    );
  }

  public getStreamOnLanguage(): Observable<Language> {
    return this.cache.results().pipe(
      switchMap(lang => {
        if (lang.length > 0) {
          return lang;
        }
        return this.api.getLanguage().pipe(delay(500), last());
      })
    );
  }

  public addLanguage(prefix: string): Observable<Language> {
    return this.cache.delete().pipe(
      switchMap(() => this.api.addLanguage(prefix)),
      tap(lang => this.cache.save(lang)),
      take(1)
    );
  }
}
