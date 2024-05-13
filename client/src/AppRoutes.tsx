import { FC } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

import AppPage from 'src/features/AppPage';
import Home from 'src/features/home/home';

const AppRouter: FC = () => {
  const routes: RouteObject[] = [
    { path: '/', element: <AppPage /> },
    { path: '/', element: <Home /> }
  ];

  return useRoutes(routes);
};

export default AppRouter;
