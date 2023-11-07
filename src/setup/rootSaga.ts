// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { all, call } from 'redux-saga/effects';

import { watchAuth as authSaga } from '@bus/auth/saga/watchers';
import { watchUi as uiSaga } from '@bus/ui/saga/watchers';

// IMPORTS

export function* rootSaga() {
  // eslint-disable-next-line prettier/prettier
  yield all([
    call(authSaga),
    call(uiSaga),
    // INJECT
  ]);
}
