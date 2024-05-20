import 'src/App.scss';

import { FC, lazy, LazyExoticComponent, ReactElement, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

const AppRouter: LazyExoticComponent<FC> = lazy(() => import('src/AppRoutes'));

const App: FC = (): ReactElement => {
  return (
    <>
      <BrowserRouter>
        <div className="w-screen min-h-screen flex flex-col relative">
          <Suspense fallback={<h1>Loading App...</h1>}>
            <AppRouter />
          </Suspense>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
