import classNames from 'classnames';
import { ChangeEvent, FC, FormEvent, lazy, ReactElement, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Id, toast } from 'react-toastify';
import { useAuthSchema } from 'src/features/auth/hooks/useAuthSchema';
import { IResetPasswordPayload } from 'src/features/auth/interfaces/auth.interface';
import { resetPasswordSchema } from 'src/features/auth/schemas/auth.schema';
import { useResetPasswordMutation } from 'src/features/auth/services/auth.service';
import PageToastAlert from 'src/shared/alerts/PageAlert';
import Button from 'src/shared/buttons/Button';
import { IResponse, validationErrorsType } from 'src/shared/common.interface';
import Header from 'src/shared/headers/components/Header';
import TextInput from 'src/shared/inputs/TextInput';
import { AUTH_FETCH_STATUS } from 'src/shared/utils/constants';
import { handleCatchFetchError, isApiResponseError } from 'src/shared/utils/utils.service';

const Alert = lazy(() => import('src/shared/alerts/Alert'));

const initResetPasswordPayload: IResetPasswordPayload = {
  password: '',
  confirmPassword: ''
};
const ResetPassword: FC = (): ReactElement => {
  const [searchParams] = useSearchParams({});
  const toastRef = useRef<Id | null>(null);
  const [userInfo, setUserInfo] = useState<IResetPasswordPayload>(initResetPasswordPayload);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [status, setStatus] = useState<string>(AUTH_FETCH_STATUS.IDLE);
  const [schemaValidation] = useAuthSchema({ schema: resetPasswordSchema, userInfo });
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onResetPassword = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      const [isValid, recievedErrors]: [boolean, validationErrorsType[]] = await schemaValidation();
      if (isValid) {
        const result: IResponse = await resetPassword({
          password: userInfo.password,
          confirmPassword: userInfo.confirmPassword,
          token: `${searchParams.get('token')}`
        }).unwrap();
        setAlertMessage(`${result.message}`);
        setStatus(AUTH_FETCH_STATUS.SUCCESS);
        setUserInfo(initResetPasswordPayload);
      } else {
        setStatus(AUTH_FETCH_STATUS.ERROR);
        setAlertMessage(Object.values(recievedErrors[0])[0] as string);
      }
    } catch (err) {
      console.log('err', isApiResponseError(err));
      if (isApiResponseError(err)) {
        if (toastRef.current) {
          toast.dismiss(toastRef.current);
        }
        toastRef.current = toast.error(handleCatchFetchError(err));
      } else {
        toastRef.current = toast.error(err.error);
      }
    }
  };

  const buttonClassNames = useMemo((): string => {
    const isDisabled = !userInfo.password || !userInfo.confirmPassword;
    return classNames('text-md block w-full rounded px-8 py-2 text-center font-bold text-white focus:outline-none', {
      'bg-sky-500 cursor-pointer hover:bg-sky-400': !isDisabled,
      'bg-gray-400 cursor-not-allowed hover:bg-gray-400': isDisabled
    });
  }, [userInfo.confirmPassword, userInfo.password]);

  return (
    <>
      <PageToastAlert />
      <Header navClass="navbar peer-checked:navbar-active fixed z-20 w-full border-b border-gray-100 bg-white/90 shadow-2xl shadow-gray-600/5 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-none" />
      <div className="relative mt-24 mx-auto w-11/12 max-w-md rounded-lg bg-white md:w-2/3">
        <div className="relative px-5 py-5">
          <h2 className="text-center text-xl font-bold leading-tight tracking-tight dark:text-black md:text-2xl mb-2">Reset Password</h2>
          {alertMessage && <Alert type={status} message={alertMessage} />}
          <form className="mt-4 space-y-4 md:space-y-5 lg:mt-5">
            <div>
              <label htmlFor="password" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                Password
              </label>
              <TextInput
                id="password"
                name="password"
                type="password"
                value={userInfo.password}
                className="flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none"
                placeholder="Enter password"
                onChange={(event: ChangeEvent) => {
                  setUserInfo({ ...userInfo, password: (event.target as HTMLInputElement).value });
                }}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                Confirm Password
              </label>
              <TextInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={userInfo.confirmPassword}
                className="flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none"
                placeholder="Enter confirm password"
                onChange={(event: ChangeEvent) => {
                  setUserInfo({ ...userInfo, confirmPassword: (event.target as HTMLInputElement).value });
                }}
              />
            </div>
            <Button
              disabled={!userInfo.password || !userInfo.confirmPassword}
              className={buttonClassNames}
              label={`${isLoading ? 'RESET PASSWORD IN PROGRESS...' : 'RESET PASSWORD'}`}
              onClick={onResetPassword}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
