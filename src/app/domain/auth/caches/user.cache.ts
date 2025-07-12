import { Injectable } from '@angular/core';
import { AppState } from '@core/infra/store/interfaces/state.model';
import { Observable, of } from 'rxjs';
import { LoadingState } from '@core/infra/store/enums/state.enum';
import { StoreService } from '@core/infra/store/services/store.service';
import { environment } from '@env/environment';

interface User {
  prefix: string;
}

type AppStateUser = AppState<User>;

@Injectable({
  providedIn: 'root',
})
export class UserCacheService {
  private store: StoreService<User> = new StoreService<User>();

  public constructor() {
    this.app();
  }

  private app(): void {
    this.store.initialState({
      items: [],
      callState: LoadingState.INIT,
      storage: {
        encryptionKey: environment.PAY_LOAD_STORAGE.user.encryptionKey,
        tableName: environment.PAY_LOAD_STORAGE.user.tableName,
        storageStrategy: environment.PAY_LOAD_STORAGE.user.storageStrategy,
      },
    });
  }

  public results(): Observable<User[]> {
    return this.store.results((state: AppStateUser) => state.items as User[]);
  }

  public save(content: User): Observable<boolean> {
    this.store.save((state: AppStateUser) => ({
      ...state,
      items: [...state.items, content],
    }));
    return of(true);
  }

  public update(content: User): Observable<boolean> {
    this.store.update((state: AppStateUser) => ({
      ...state,
      items: state.items.map(item => (item.prefix === content.prefix ? content : item)),
    }));
    return of(true);
  }

  public deletById(prefix: string): Observable<boolean> {
    this.store.deletById((state: AppStateUser) => ({
      ...state,
      items: state.items.filter(item => item.prefix !== prefix),
    }));
    return of(true);
  }

  public delete(): Observable<boolean> {
    return this.store.delete();
  }
}
