import { Injectable } from '@angular/core';
import { AppState } from '@core/infra/store/interfaces/state.model';
import { Observable, of } from 'rxjs';
import { iLanguage } from '../interfaces/language.interface';
import { eLoadingState } from '@core/infra/store/enums/state.enum';
import { TIME_1_SECOND } from '@shared/constants/time.constant';
import { StoreService } from '@core/infra/store/services/store.service';
import { environment } from 'src/environments/environment';

type AppStateLang = AppState<iLanguage>;

@Injectable({
    providedIn: 'root',
})
export class LanguageCacheService {
    public constructor(private store: StoreService<iLanguage>) {
        this.app();
        setTimeout(() => {
            this.app();
        }, TIME_1_SECOND);
    }

    private app() {
        this.store.initialState({
            items: [],
            callState: eLoadingState.INIT,
            storage: {
                encryptionKey: environment.payloadStorage.systemLanguage.encryptionKey,
                tableName: environment.payloadStorage.systemLanguage.tableName,
                storageStrategy:
                    environment.payloadStorage.systemLanguage.storageStrategy,
            },
        });
    }

    public results(): Observable<iLanguage[]> {
        return this.store.results((state: AppStateLang) => state.items as any);
    }

    public save(content: iLanguage): Observable<boolean> {
        this.store.save((state: AppStateLang) => ({
            ...state,
            items: [...state.items, content],
        }));
        return of(true);
    }

    public update(content: iLanguage): Observable<boolean> {
        this.store.update((state: AppStateLang) => ({
            ...state,
            items: state.items.map((item) =>
                item.prefix === content.prefix ? content : item
            ),
        }));
        return of(true);
    }

    public deletById(prefix: string): Observable<boolean> {
        this.store.deletById((state: AppStateLang) => ({
            ...state,
            items: state.items.filter((item) => item.prefix !== prefix),
        }));
        return of(true);
    }

    public delete(): Observable<boolean> {
        return this.store.delete();
    }
}
