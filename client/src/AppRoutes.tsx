import { FC } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

const AppRouter: FC = () => {
    const routes: RouteObject[] = [];
    
    return useRoutes(routes);
};

export default AppRouter;