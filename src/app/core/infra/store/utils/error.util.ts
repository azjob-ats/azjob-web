import { eLoadingState } from '../enums/state.enum';
import { CallState, iErrorState } from '../interfaces/state.model';

export const getError = (callState: CallState): eLoadingState | string | null => {
  if ((callState as iErrorState).errorMsg !== undefined) {
    return (callState as iErrorState).errorMsg;
  }

  return null;
};
