/* eslint-disable prettier/prettier */
import React, { lazy } from 'react';

import layouts from '@layouts/index';
import { commonRoutes } from '@pages/common/routes';
import { book } from '@routes/book';
import { AppRoute } from '@setup/typedefs';

// IMPORTS

export const privateRoutes: AppRoute<any>[] = [
  ...[
    // INJECT
  ],
  ...commonRoutes,
];
