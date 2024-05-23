import { FC, lazy, LazyExoticComponent, ReactElement, ReactNode, Suspense, useCallback, useEffect, useState } from 'react';
import { Navigate, NavigateFunction, useNavigate } from 'react-router-dom';
import { addAuthUser } from 'src/features/auth/reducers/auth.reducer';
import { useCheckCurrentUserSessionQuery } from 'src/features/auth/services/auth.service';
import PageToastAlert from 'src/shared/alerts/PageAlert';
import { IHomeHeaderProps } from 'src/shared/headers/interfaces/header.interface';
import { applicationLogout, saveToSessionStorage } from 'src/shared/utils/utils.service';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';

const HomeHeader: LazyExoticComponent<FC<IHomeHeaderProps>> = lazy(() => import('src/shared/headers/components/HomeHeader'));

export interface IProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ children }): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const showCategoryContainer = useAppSelector((state: IReduxState) => state.showCategoryContainer);
  const header = useAppSelector((state: IReduxState) => state.header);
  const [tokenIsValid, setTokenIsValid] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const { data, isError } = useCheckCurrentUserSessionQuery();

  const checkUser = useCallback(async () => {
    if (data && data.user) {
      setTokenIsValid(true);
      dispatch(addAuthUser({ authInfo: data.user }));
      saveToSessionStorage(JSON.stringify(true), JSON.stringify(authUser.username));
    }

    if (isError) {
      setTokenIsValid(false);
      applicationLogout(dispatch, navigate);
    }
  }, [data, dispatch, navigate, isError, authUser.username]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  if (data && data.user && authUser) {
    if (tokenIsValid) {
      return (
        <>
          <PageToastAlert />
          {header && header === 'home' && (
            <Suspense>
              <HomeHeader showCategoryContainer={showCategoryContainer} />
            </Suspense>
          )}
          {children}
        </>
      );
    } else {
      return <>Token is invalid.</>;
    }
  } else {
    return <>{<Navigate to="/" replace />}</>;
  }
};

export default ProtectedRoute;
