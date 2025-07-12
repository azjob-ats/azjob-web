import { inject } from '@angular/core';
import { StorageStrategy } from '@core/infra/storage/enums/storage.enum';
import { BehaviorSubject, filter, map, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { AppState } from '@core/infra/store/interfaces/state.model';
import { StorageLocalService } from '@core/infra/storage/services/storage-local.service';
import { StorageSessionService } from '@core/infra/storage/services/storage-session.service';
import { TypeObjectUtil } from '@shared/utils/type-object.util';
import { CryptoService } from '@core/infra/crypto/crypto-discontinued.service';
export class StoreService<T> {
  /*Ele armazena o estado atual e permite a atualização do estado ao chamar .next(value).
    Mantém o último valor armazenado.
    Pode ser atualizado com .next(value).
    Útil para armazenar estados que mudam dinamicamente.*/
  private stateStore = new BehaviorSubject<AppState<T> | null>(null);

  /*usado para expor o estado sem permitir modificações diretas.
    Apenas leitura(não pode ser atualizado diretamente).
    Evita mutações acidentais no estado.
    Qualquer componente pode assinar(subscribe) para obter o estado atualizado.*/
  private state$ = this.stateStore.asObservable();

  public constructor() {}

  public storage: StorageLocalService<AppState<T>> = inject(StorageLocalService);
  public session: StorageSessionService<AppState<T>> = inject(StorageSessionService);
  public crypto: CryptoService<AppState<T>> = inject(CryptoService);

  public initialState(initialState: AppState<T>): Observable<AppState<T> | null> {
    this.stateStore.next(initialState);
    return this.state$;
  }

  public results(selector: (state: AppState<T>) => any): Observable<any> {
    return this.state$.pipe(
      filter(Boolean),
      map(selector),
      startWith(this.getFromStorage()),
      tap(state => {
        if (state?.items) {
          this.stateStore.next(state);
        }
      }),
      switchMap(() => of(this.stateStore.getValue()!)),
      map(selector)
    );
  }

  public save(updateFn: (state: AppState<T>) => AppState<T>): Observable<boolean> {
    const currentState = this.stateStore.value;
    if (currentState) {
      const newState = updateFn(currentState);
      this.stateStore.next(newState);
      return this.persistState(newState);
    }
    return of(false);
  }

  public update(updateFn: (state: AppState<T>) => AppState<T>): Observable<boolean> {
    const state = this.getFromStorage();
    if (state?.items) {
      this.save(updateFn);
      const newState = updateFn(state!);
      this.stateStore.next(newState);
      return this.save(updateFn);
    }
    return of(false);
  }

  public deletById(updateFn: (state: AppState<T>) => AppState<T>): Observable<boolean> {
    return this.save(updateFn);
  }

  public delete(): Observable<boolean> {
    const currentState = this.stateStore.value;
    if (!currentState) {
      this.stateStore.next(currentState);
      return this.clearStorage();
    }
    currentState!.items = [];
    this.stateStore.next(currentState);
    return this.clearStorage();
  }

  private persistState(state: AppState<T>): Observable<boolean> {
    let dataToStore: AppState<T> | string = state;

    // Se houver uma chave de criptografia, encripta os dados antes de salvar
    if (state.storage.encryptionKey) {
      dataToStore = {
        ...state,
        items: state.items,
      };
      dataToStore = this.crypto.encrypt(dataToStore, state.storage.encryptionKey);
    }

    if (state.storage.storageStrategy === StorageStrategy.LOCAL_STORAGE) {
      this.storage.save(state.storage.tableName, dataToStore as AppState<T>);
      return of(true);
    } else if (state.storage.storageStrategy === StorageStrategy.SESSION_STORAGE) {
      this.session.save(state.storage.tableName, dataToStore as AppState<T>);
      return of(true);
    }

    return of(false);
  }

  private clearStorage(): Observable<boolean> {
    const state = this.stateStore.value;
    if (state) {
      if (state.storage.storageStrategy === StorageStrategy.LOCAL_STORAGE) {
        this.storage.delete(state.storage.tableName);
        return of(true);
      } else if (state.storage.storageStrategy === StorageStrategy.SESSION_STORAGE) {
        this.session.delete(state.storage.tableName);
        return of(true);
      }
    }
    return of(false);
  }

  private getFromStorage(): AppState<T> | null {
    const currentState = this.stateStore.value;
    if (currentState == null) return null;
    const { tableName, storageStrategy, encryptionKey } = currentState?.storage as any;

    let storedData: string | null = null;
    if (storageStrategy === StorageStrategy.LOCAL_STORAGE) {
      storedData = localStorage.getItem(tableName);
    } else if (storageStrategy === StorageStrategy.SESSION_STORAGE) {
      storedData = sessionStorage.getItem(tableName);
    }

    if (!storedData) return null;
    // Se houver chave de criptografia, descriptografa os dados
    const decryptedData: any = encryptionKey
      ? this.crypto.decrypt(storedData, encryptionKey)
      : storedData;
    return TypeObjectUtil.setValue(decryptedData);
  }
}
