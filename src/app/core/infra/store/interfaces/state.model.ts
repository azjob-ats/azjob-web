import { eLoadingState } from '../enums/state.enum';
import { iStorage } from '@core/infra/storage/interfaces/storage.interface';

export interface iErrorState {
  errorMsg: string;
}

export type CallState = eLoadingState | iErrorState;

export interface AppState<T> {
  items: T[];
  callState: CallState;
  storage: iStorage;
}
