import { Navigate, Route, Routes } from 'react-router-dom';

import { publicRoutes } from '@pages/public/routes';
import AuthLayout from '@layouts/AuthLayout';
import { book } from '@routes/book.ts';
import { getId } from '@helpers/getId';

const PublicRoutes = () => {
  return (
    <Routes>
      {publicRoutes.map(({ path, Component, Layout, layoutProps }) => (
        <Route element={<Layout {...layoutProps} />} key={getId()}>
          <Route path={path} element={Component} />
        </Route>
      ))}
      <Route element={<AuthLayout />}>
        <Route path={'/*'} element={<Navigate replace to={book.signIn} />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
