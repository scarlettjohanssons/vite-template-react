import { FORM_ERROR } from 'final-form';
import { apply, call, put } from 'redux-saga/effects';

import { api } from '@REST/api';
import { handleError } from '@bus/ui/saga/workers/handleError';
import { throwError } from '@bus/ui/saga/workers/throwError';
import { FinalFormTypes } from '@packages/evne-form';

import { authActions } from '../../actions';
import { SignInActionPayload } from '../../typedefs';

export function* signIn({
  payload,
  meta: { resolve, reject },
}: FinalFormTypes.PayloadActionWithPromiseMeta<SignInActionPayload>) {
  try {
    const { remember, password, email } = payload;
    const body: string = yield call(JSON.stringify, { password, email });

    const response: Response = yield apply(api, api.post, [
      { endpoint: `auth/signin/`, body, unsafe: true },
    ]);

    if (response.status === 400) {
      reject({
        [FORM_ERROR]: 'Please check you credentials',
      });
      yield throwError(response);
    }

    if (response.status === 401) {
      reject({
        [FORM_ERROR]: 'Please check you credentials',
      });
      yield throwError(response);
    }

    const { access, refresh } = yield call([response, 'json']);

    yield put(authActions.isAuthenticatedTrue());

    if (remember) {
      window.localStorage.setItem('accessToken', JSON.stringify(access));
      window.localStorage.setItem('refreshToken', JSON.stringify(refresh));
      window.localStorage.setItem('remember', JSON.stringify(remember));
    } else {
      window.sessionStorage.setItem('accessToken', JSON.stringify(access));
      window.sessionStorage.setItem('refreshToken', JSON.stringify(refresh));
    }

    resolve();
  } catch (e) {
    yield handleError(e);
  }
}
