import { CallState, ErrorState } from '@core/infra/store/interfaces/state.model';
import { LoadingState } from '@core/infra/store/enums/state.enum';

export const getError = (callState: CallState): LoadingState | string | null => {
  if ((callState as ErrorState).errorMsg !== undefined) {
    return (callState as ErrorState).errorMsg;
  }

  return null;
};
