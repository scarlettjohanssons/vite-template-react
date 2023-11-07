import { apply, call, put } from 'redux-saga/effects';

import { api } from '@REST/api';
import { handleError } from '@bus/ui/saga/workers/handleError';
import { throwError } from '@bus/ui/saga/workers/throwError';
import { FinalFormTypes, getServerFormErrors } from '@packages/evne-form';

import { authActions } from '../../actions';
import { ContactUsPayload } from '../../typedefs';

export function* postSupport({
  payload,
  meta: { resolve, reject },
}: FinalFormTypes.PayloadActionWithPromiseMeta<ContactUsPayload>) {
  try {
    yield put(authActions.startFetching());
    const body: string = yield call(JSON.stringify, payload);

    const response: Response = yield apply(api, api.post, [
      { endpoint: `support/`, body, unsafe: true },
    ]);

    if (response.status >= 400) {
      const errors: FinalFormTypes.ServerFormErrors = yield call([
        response,
        'json',
      ]);
      const formErrors: FinalFormTypes.FormErrors = yield call(
        getServerFormErrors,
        errors,
      );
      reject(formErrors);
      yield throwError(response);
    }

    if (!response.ok) {
      reject();
      yield throwError(response);
    }
    resolve();
  } catch (e) {
    yield handleError(e);
  } finally {
    yield put(authActions.stopFetching());
  }
}
