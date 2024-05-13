import 'src/App.scss';
import { FC, ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from 'src/AppRoutes';

const App: FC = (): ReactElement => {
  return (
    <>
      <BrowserRouter>
        <div className="w-screen min-h-screen flex flex-col relative">
          <AppRouter />
        </div>
      </BrowserRouter>

      <script src=""></script>
    </>
  );
};

export default App;
