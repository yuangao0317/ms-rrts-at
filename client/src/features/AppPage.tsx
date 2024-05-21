import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { IAuthUser } from 'src/features/auth/interfaces/auth.interface';
import { addAuthUser } from 'src/features/auth/reducers/auth.reducer';
import { updateLogout } from 'src/features/auth/reducers/logout.reducer';
import { useCheckCurrentUserSessionQuery } from 'src/features/auth/services/auth.service';
import Home from 'src/features/home/home';
import Index from 'src/features/index';
import { updateHeader } from 'src/shared/headers/reducers/header.reducer';
import { headerValue } from 'src/shared/utils/constants';
import { applicationLogout, saveToSessionStorage } from 'src/shared/utils/utils.service';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';

const AppPage: FC = (): ReactElement => {
  const authUser: IAuthUser = useAppSelector((state: IReduxState) => state.authUser);
  const appLogout = useAppSelector((state: IReduxState) => state.logout);
  // conditional fetching:
  // When skip is true, the cached data will not be used on the initial load, and will ignore updates from any identical query until the skip condition is removed
  // skip: true will force to fetch instead of using cache
  const { data: currentUserData, isError } = useCheckCurrentUserSessionQuery(undefined, {
    skip: authUser.id === null
  });
  const [isSessionValid, setIsSessionValid] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  const checkUser = useCallback(async () => {
    try {
      if (currentUserData && currentUserData.user && !appLogout) {
        setIsSessionValid(true);
        dispatch(addAuthUser({ authInfo: currentUserData.user }));
        dispatch(updateLogout(false));
        dispatch(updateHeader(headerValue.home));
        saveToSessionStorage(JSON.stringify(true), JSON.stringify(authUser.username));
      }
    } catch (error) {
      console.log(error);
    }
  }, [appLogout, authUser.username, currentUserData, dispatch]);

  const logoutUser = useCallback(async () => {
    setIsSessionValid(false);
    applicationLogout(dispatch, navigate);
  }, [dispatch, navigate]);

  useEffect(() => {
    checkUser();

    if ((!currentUserData && appLogout) || isError) {
      logoutUser();
    }
  }, [appLogout, checkUser, currentUserData, isError, logoutUser]);

  if (authUser) {
    return !isSessionValid && !authUser.id ? (
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
