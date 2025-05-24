import { LoadingState } from '@core/infra/store/enums/state.enum';
import { Storage } from '@core/infra/storage/interfaces/storage.interface';

export interface ErrorState {
  errorMsg: string;
}

export type CallState = LoadingState | ErrorState;

export interface AppState<T> {
  items: T[];
  callState: CallState;
  storage: Storage;
}
