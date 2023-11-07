/* eslint-disable prettier/prettier */
import { lazy } from 'react';

import layouts from '@layouts/index';
import { book } from '@routes/book';

import { AppRoute } from '@setup/typedefs';
const TermsOfUse = lazy(()=> import('@pages/common/TermsOfUse'));

// IMPORTS
export const commonRoutes: AppRoute<any>[] = [
  // inject
  {
    path: book.terms,
    Component: <TermsOfUse />,
    Layout: layouts.CommonLayout,
    layoutProps: {},
  },
  // INJECT
];