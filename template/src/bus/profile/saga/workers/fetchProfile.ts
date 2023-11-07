import * as effects from 'redux-saga/effects';

import { api } from '@REST/api';
import { handleError } from '@bus/ui/saga/workers/handleError';
import { throwError } from '@bus/ui/saga/workers/throwError';
import { IProfile } from '@bus/profile/typedefs';

import { profileActions } from '../../actions';

export function* fetchProfile() {
  try {
    yield effects.put(profileActions.startFetching());
    const response: Response = yield effects.apply(api, api.get, [
      { endpoint: 'users/me/' },
    ]);
    if (!response.ok) {
      yield throwError(response);
    }
    const data: IProfile = yield effects.call([response, 'json']);
    yield effects.put(profileActions.fillProfile(data));
  } catch (e) {
    yield handleError(e);
  } finally {
    yield effects.put(profileActions.stopFetching());
  }
}
