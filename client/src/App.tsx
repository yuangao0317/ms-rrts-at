import 'src/App.scss';

import { FC, ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from 'src/AppRoutes';
import PageToastAlert from 'src/shared/alerts/PageAlert';

const App: FC = (): ReactElement => {
  return (
    <>
      <BrowserRouter>
        <div className="w-screen min-h-screen flex flex-col relative">
          <PageToastAlert />
          <AppRouter />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
