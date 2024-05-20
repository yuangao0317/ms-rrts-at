import { FC } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import AppPage from 'src/features/AppPage';
import ConfirmEmail from 'src/features/auth/components/ConfirmEmail';
import Home from 'src/features/home/home';

const AppRouter: FC = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <AppPage />
    },
    {
      path: '/',
      element: <Home />
    },
    {
      path: 'confirm_email',
      element: <ConfirmEmail />
    }
  ];

  return useRoutes(routes);
};

export default AppRouter;
