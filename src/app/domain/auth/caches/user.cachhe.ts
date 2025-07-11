import { Injectable } from '@angular/core';
import { AppState } from '@core/infra/store/interfaces/state.model';
import { Observable, of } from 'rxjs';
import { LoadingState } from '@core/infra/store/enums/state.enum';
import { TIME_1_SECOND } from '@shared/constants/time.constant';
import { StoreService } from '@core/infra/store/services/store.service';
import { environment } from '@env/environment';

type AppStateLang = AppState<any>;

@Injectable({
    providedIn: 'root',
})
export class UserCacheService {
    private store: StoreService<any> = new StoreService<any>();

    public constructor() {
        this.app();
    }

    private app() {
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

    public results(): Observable<any[]> {
        return this.store.results((state: AppStateLang) => state.items as any);
    }

    public save(content: any): Observable<boolean> {
        this.store.save((state: AppStateLang) => ({
            ...state,
            items: [...state.items, content],
        }));
        return of(true);
    }

    public update(content: any): Observable<boolean> {
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
