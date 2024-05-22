import { FC, lazy, LazyExoticComponent, ReactNode, Suspense } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import AppPage from 'src/features/AppPage';
import ProtectedRoute from 'src/features/ProtectedRoute';

const ConfirmEmail: LazyExoticComponent<FC> = lazy(() => import('src/features/auth/components/ConfirmEmail'));
const ResetPassword: LazyExoticComponent<FC> = lazy(() => import('src/features/auth/components/ResetPassword'));
const Home: LazyExoticComponent<FC> = lazy(() => import('src/features/home/home'));

const Layout = ({ backgroundColor = '#fff', children }: { backgroundColor: string; children: ReactNode }): JSX.Element => (
  <div style={{ backgroundColor }} className="flex flex-grow">
    {children}
  </div>
);

const AppRouter: FC = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <AppPage />
    },
    {
      path: '/',
      element: (
        <Suspense fallback={<div>Loading Home...</div>}>
          <ProtectedRoute>
            <Layout backgroundColor="#ffffff">
              <Home />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      )
    },
    {
      path: 'confirm_email',
      element: (
        <Suspense fallback={<div>Loading ConfirmEmail...</div>}>
          <ConfirmEmail />
        </Suspense>
      )
    },
    {
      path: 'reset_password',
      element: (
        <Suspense fallback={<div>Loading ResetPassword...</div>}>
          <ResetPassword />
        </Suspense>
      )
    }
  ];

  return useRoutes(routes);
};

export default AppRouter;
