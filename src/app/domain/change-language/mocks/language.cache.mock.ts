import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Language } from '@domain/change-language/interfaces/language.interface';

@Injectable({
  providedIn: 'root',
})
export class LanguageCacheMockService {
  public results(): Observable<Language[]> {
    return of([
      {
        language: 'Inglês (Estados Unidos)',
        prefix: 'en-US',
      },
    ]);
  }

  public save(content: Language): Observable<boolean> {
    return of(content ? true : false);
  }

  public update(content: Language): Observable<boolean> {
    return of(content ? true : false);
  }

  public deletById(prefix: string): Observable<boolean> {
    return of(prefix ? true : false);
  }

  public delete(): Observable<boolean> {
    return of(true);
  }
}
