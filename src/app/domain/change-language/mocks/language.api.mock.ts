import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Language } from '@domain/change-language/interfaces/language.interface';

@Injectable({ providedIn: 'root' })
export class LanguageApiMockservice {
  private lang$!: BehaviorSubject<Language[]>;
  private favorite$!: BehaviorSubject<Language>;
  private lang: Language[] = [
    { language: 'Português (Brasil)', prefix: 'pt-BR' },
    { language: 'Inglês (Estados Unidos)', prefix: 'en-US' },
    { language: 'Espanhol (Colômbia)', prefix: 'es-CO' },
  ];

  public constructor() {
    this.favorite$ = new BehaviorSubject({
      language: 'Inglês (Estados Unidos)',
      prefix: 'en-US',
    });
    this.lang$ = new BehaviorSubject(this.lang);
  }

  public getAllLanguage(): Observable<Language[]> {
    return this.lang$.asObservable();
  }

  public getLanguage(): Observable<Language> {
    return this.favorite$.asObservable();
  }

  public addLanguage(prefix: string): Observable<Language> {
    const lang = this.lang.find(r => r.prefix == prefix);
    this.favorite$.next(lang!);
    return this.favorite$.asObservable();
  }
}
