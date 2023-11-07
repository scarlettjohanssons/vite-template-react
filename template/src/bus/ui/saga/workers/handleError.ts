import { put } from 'redux-saga/effects';

import { authActions } from '@bus/auth/actions';
import { book } from '@routes/book';
import * as Sentry from '@sentry/react';

export function* handleError(error: any) {
  Sentry.captureException(error);
  if (error.cause.status_code === 401 && error.cause.details.code) {
    yield put(authActions.clearData());
    localStorage.setItem('snackbar_message', error.cause.details.detail);
    window.location.pathname = book.signIn;
  }
}
