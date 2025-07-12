import { Injectable } from '@angular/core';
import { AppState } from '@core/infra/store/interfaces/state.model';
import { Observable, of } from 'rxjs';
import { Language } from '@domain/change-language/interfaces/language.interface';
import { LoadingState } from '@core/infra/store/enums/state.enum';
import { StoreService } from '@core/infra/store/services/store.service';
import { environment } from '@env/environment';

type AppStateLang = AppState<Language>;

@Injectable({
  providedIn: 'root',
})
export class LanguageCacheService {
  private store: StoreService<Language> = new StoreService<Language>();

  public constructor() {
    this.app();
  }

  private app(): void {
    this.store.initialState({
      items: [],
      callState: LoadingState.INIT,
      storage: {
        encryptionKey: environment.PAY_LOAD_STORAGE.systemLanguage.encryptionKey,
        tableName: environment.PAY_LOAD_STORAGE.systemLanguage.tableName,
        storageStrategy: environment.PAY_LOAD_STORAGE.systemLanguage.storageStrategy,
      },
    });
  }

  public results(): Observable<Language[]> {
    return this.store.results((state: AppStateLang) => state.items);
  }

  public save(content: Language): Observable<boolean> {
    this.store.save((state: AppStateLang) => ({
      ...state,
      items: [...state.items, content],
    }));
    return of(true);
  }

  public update(content: Language): Observable<boolean> {
    this.store.update((state: AppStateLang) => ({
      ...state,
      items: state.items.map(item => (item.prefix === content.prefix ? content : item)),
    }));
    return of(true);
  }

  public deletById(prefix: string): Observable<boolean> {
    this.store.deletById((state: AppStateLang) => ({
      ...state,
      items: state.items.filter(item => item.prefix !== prefix),
    }));
    return of(true);
  }

  public delete(): Observable<boolean> {
    return this.store.delete();
  }
}
