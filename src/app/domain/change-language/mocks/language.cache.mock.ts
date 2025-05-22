import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { iLanguage } from '../interfaces/language.interface';

@Injectable({
  providedIn: 'root',
})
export class LanguageCacheMockService {
  public results(): Observable<iLanguage[]> {
    return of([
      {
        language: 'Inglês (Estados Unidos)',
        prefix: 'en-US',
      },
    ]);
  }

  public save(content: iLanguage): Observable<boolean> {
    return of(content ? true : false);
  }

  public update(content: iLanguage): Observable<boolean> {
    return of(content ? true : false);
  }

  public deletById(prefix: string): Observable<boolean> {
    return of(prefix ? true : false);
  }

  public delete(): Observable<boolean> {
    return of(true);
  }
}
