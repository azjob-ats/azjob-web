import { inject, Injectable } from '@angular/core';
import { Observable, switchMap, take, tap } from 'rxjs';
import { LanguageApiMockservice } from '../mocks/language.api.mock';
import { iLanguage } from '@domain/change-language/interfaces/language.interface';
import { LanguageCacheService } from '../caches/language.cache';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private api: LanguageApiMockservice = inject(LanguageApiMockservice);
  private cache: LanguageCacheService = inject(LanguageCacheService);

  public getAllLanguage(): Observable<iLanguage[]> {
    return this.api.getAllLanguage();
  }

  public getLanguage(): Observable<iLanguage> {
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

  public addLanguage(prefix: string): Observable<iLanguage> {
    return this.cache.delete().pipe(
      switchMap(() => this.api.addLanguage(prefix)),
      tap(lang => this.cache.save(lang)),
      take(1)
    );
  }
}
