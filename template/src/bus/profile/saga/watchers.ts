import * as effects from 'redux-saga/effects';

import { profileActions } from '../actions';
// eslint-disable-next-line prettier/prettier
import {
  fetchProfile,
  updateProfile,
} from './workers';

// IMPORTS
function* watchFetchProfile() {
  yield effects.takeEvery(profileActions.fetchProfile.type, fetchProfile);
}

function* watchUpdateProfile() {
  yield effects.takeEvery(profileActions.updateProfile.type, updateProfile);
}
// WATCHERS
export function* watchProfile() {
  // eslint-disable-next-line prettier/prettier
  yield effects.all([
    effects.call(watchFetchProfile),
    effects.call(watchUpdateProfile),
    // INJECT
  ]);
}
