import { Route, Routes } from 'react-router-dom';

import { privateRoutes } from '@pages/private/routes';

// IMPORTS
const PrivateRoutes = () => {
  return (
    <Routes>
      {privateRoutes.map(({ path, Component, Layout, layoutProps }) => (
        <Route element={<Layout {...layoutProps} />} key={path}>
          <Route path={path} element={Component} />
        </Route>
      ))}
    </Routes>
  );
};

export default PrivateRoutes;
