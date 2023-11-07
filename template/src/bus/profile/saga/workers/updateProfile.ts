import { apply, call, put, select } from 'redux-saga/effects';

import { api } from '@REST/api';
import { handleError } from '@bus/ui/saga/workers/handleError';
import { throwError } from '@bus/ui/saga/workers/throwError';
import { FinalFormTypes, getServerFormErrors } from '@packages/evne-form';

import { profileActions } from '../../actions';
import { getCurrentUserId } from '../../selectors';
import { IProfile } from '../../typedefs';

export function* updateProfile({
  payload,
  meta: { resolve, reject },
}: FinalFormTypes.PayloadActionWithPromiseMeta<Partial<IProfile>>) {
  try {
    yield put(profileActions.startFetching());
    const body: string = yield call(JSON.stringify, payload);
    const id: number = yield select(getCurrentUserId);
    const response: Response = yield apply(api, api.patch, [
      {
        endpoint: `users/${id}/`,
        body,
      },
    ]);
    const data: FinalFormTypes.ServerFormErrors | IProfile = yield call([
      response,
      'json',
    ]);

    if (!response.ok) {
      const formErrors: FinalFormTypes.FormErrors = yield call(
        getServerFormErrors,
        data as FinalFormTypes.ServerFormErrors,
      );
      reject(formErrors);
      yield throwError(response);
    }

    yield put(profileActions.fillProfile(data as IProfile));
    resolve();
  } catch (e) {
    yield handleError(e);
  } finally {
    yield put(profileActions.stopFetching());
  }
}
