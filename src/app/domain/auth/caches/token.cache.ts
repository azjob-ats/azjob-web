import { Injectable } from '@angular/core';
import { AppState } from '@core/infra/store/interfaces/state.model';
import { Observable, of } from 'rxjs';
import { LoadingState } from '@core/infra/store/enums/state.enum';
import { StoreService } from '@core/infra/store/services/store.service';
import { environment } from '@env/environment';
import { UserToken } from '../interfaces/index.interface';

type AppStateToken = AppState<UserToken>;

@Injectable({
  providedIn: 'root',
})
export class TokenCacheService {
  private store: StoreService<UserToken> = new StoreService<UserToken>();

  public constructor() {
    this.app();
  }

  private app(): void {
    this.store.initialState({
      items: [],
      callState: LoadingState.INIT,
      storage: {
        encryptionKey: environment.PAY_LOAD_STORAGE.token.encryptionKey,
        tableName: environment.PAY_LOAD_STORAGE.token.tableName,
        storageStrategy: environment.PAY_LOAD_STORAGE.token.storageStrategy,
      },
    });
  }

  public results(): Observable<UserToken[]> {
    return this.store.results((state: AppStateToken) => state.items as UserToken[]);
  }

  public save(content: UserToken): Observable<boolean> {
    this.store.save((state: AppStateToken) => ({
      ...state,
      items: [...state.items, content],
    }));
    return of(true);
  }

  public update(content: UserToken): Observable<boolean> {
    this.store.update((state: AppStateToken) => ({
      ...state,
      items: state.items.map(item =>
        item.refreshToken.userId === content.refreshToken.userId ? content : item
      ),
    }));
    return of(true);
  }

  public deletById(prefix: number): Observable<boolean> {
    this.store.deletById((state: AppStateToken) => ({
      ...state,
      items: state.items.filter(item => item.refreshToken.userId !== prefix),
    }));
    return of(true);
  }

  public delete(): Observable<boolean> {
    return this.store.delete();
  }
}
