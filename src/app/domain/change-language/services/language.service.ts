import { inject, Injectable } from '@angular/core';
import { Observable, switchMap, take, tap } from 'rxjs';
import { LanguageMockservice } from '../mocks/language.mock';
import { iLanguage } from '../interfaces/language.interface';
import { LanguageCacheMockService } from '../mocks/language.cache.mock';


@Injectable({ providedIn: 'root' })
export class LanguageService {
    private api: LanguageMockservice = inject(LanguageMockservice);
    private cache: LanguageCacheMockService = inject(LanguageCacheMockService);

    public getAllLanguage(): Observable<iLanguage[]> {
        return this.api.getAllLanguage();
    }

    public getLanguage(): Observable<iLanguage> {
        return this.cache.results().pipe(
            switchMap((lang) => {
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
            tap((lang) => this.cache.save(lang)),
            take(1)
        );
    }
}