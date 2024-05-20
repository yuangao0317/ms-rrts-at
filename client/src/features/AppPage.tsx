import { FC, ReactElement } from 'react';
import { IAuthUser } from 'src/features/auth/interfaces/auth.interface';
import Home from 'src/features/home/home';
import Index from 'src/features/index';
import Index1 from 'src/features/index1';
import { useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';

const AppPage: FC = (): ReactElement => {
  const authUser: IAuthUser = useAppSelector((state: IReduxState) => state.authUser);

  if (authUser) {
    return !authUser.id ? (
      <Index />
    ) : (
      <>
        <Home />
      </>
    );
  } else {
    return <Index />;
  }
};

export default AppPage;
