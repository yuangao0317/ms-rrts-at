import { ChangeEvent, FC, ReactElement, useRef, useState } from 'react';
import { FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Id, toast } from 'react-toastify';
import { useAuthSchema } from 'src/features/auth/hooks/useAuthSchema';
import { ISignInPayload } from 'src/features/auth/interfaces/auth.interface';
import { addAuthUser } from 'src/features/auth/reducers/auth.reducer';
import { updateLogout } from 'src/features/auth/reducers/logout.reducer';
import { loginUserSchema } from 'src/features/auth/schemas/auth.schema';
import { useSignInMutation } from 'src/features/auth/services/auth.service';
import Alert from 'src/shared/alerts/Alert';
import Button from 'src/shared/buttons/Button';
import { IModalContainerProps, IResponse, validationErrorsType } from 'src/shared/common.interface';
import { updateHeader } from 'src/shared/headers/reducers/header.reducer';
import TextInput from 'src/shared/inputs/TextInput';
import ModalContainer from 'src/shared/modals/ModalContainer';
import { headerValue } from 'src/shared/utils/constants';
import { handleCatchFetchError, isApiResponseError, saveToSessionStorage } from 'src/shared/utils/utils.service';
import { useAppDispatch } from 'src/store/store';

const LoginModal: FC<IModalContainerProps> = ({ onClose, onToggle, onTogglePassword }): ReactElement => {
  const [userInfo, setUserInfo] = useState<ISignInPayload>({
    username: '',
    password: ''
  });
  const [passwordType, setPasswordType] = useState<string>('password');
  const [schemaValidation] = useAuthSchema({ schema: loginUserSchema, userInfo });
  const [signIn, { error, isLoading }] = useSignInMutation();
  const [alertMessage, setAlertMessage] = useState<string>('');
  const toastRef = useRef<Id | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLoginUser = async (): Promise<void> => {
    try {
      const [isValid, recievedErrors]: [boolean, validationErrorsType[]] = await schemaValidation();
      if (isValid) {
        const result: IResponse = await signIn(userInfo).unwrap();
        if (result && (result.browserName || result.deviceType)) {
          navigate('/verify_otp');
        } else {
          setAlertMessage('');
          dispatch(addAuthUser({ authInfo: result.user }));
          dispatch(updateLogout(false));
          dispatch(updateHeader(headerValue.home));
          saveToSessionStorage(JSON.stringify(true), JSON.stringify(result.user?.username));
        }
      } else {
        setAlertMessage(Object.values(recievedErrors[0])[0] as string);
      }
    } catch (err) {
      console.log('err', err);
      setAlertMessage('');
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

  return (
    <>
      <ModalContainer>
        <div className="relative top-[20%] mx-auto w-11/12 max-w-md rounded-lg bg-white md:w-2/3">
          <div className="relative px-5 py-5">
            <div className="mb-5 flex justify-between text-2xl font-bold text-gray-600">
              <h1 className="flex w-full justify-center">Sign In to FreelanPo</h1>
              <Button
                testId="closeModal"
                className="cursor-pointer rounded text-gray-400 hover:text-gray-600"
                role="button"
                label={<FaTimes className="icon icon-tabler icon-tabler-x" />}
                onClick={onClose}
              />
            </div>
            {alertMessage && <Alert type="error" message={alertMessage} />}
            <div>
              <label htmlFor="username" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                Email or username
              </label>
              <TextInput
                id="username"
                name="username"
                type="text"
                value={userInfo.username}
                className="mb-5 mt-2 flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none"
                placeholder="Enter username"
                onChange={(event: ChangeEvent) => {
                  setUserInfo({ ...userInfo, username: (event.target as HTMLInputElement).value });
                }}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                Password
              </label>
              <div className="relative mb-2 mt-2">
                <div className="absolute right-0 flex h-full cursor-pointer items-center pr-3 text-gray-600">
                  {passwordType === 'password' ? (
                    <FaEyeSlash onClick={() => setPasswordType('text')} className="icon icon-tabler icon-tabler-info-circle" />
                  ) : (
                    <FaEye onClick={() => setPasswordType('password')} className="icon icon-tabler icon-tabler-info-circle" />
                  )}
                </div>
                <TextInput
                  id="password"
                  name="password"
                  type={passwordType}
                  value={userInfo.password}
                  className="flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none"
                  placeholder="Enter password"
                  onChange={(event: ChangeEvent) => {
                    setUserInfo({ ...userInfo, password: (event.target as HTMLInputElement).value });
                  }}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <div
                className="mb-6 ml-2 cursor-pointer text-sm text-blue-600 hover:underline dark:text-blue-500"
                onClick={() => {
                  if (onTogglePassword) {
                    onTogglePassword(true);
                  }
                }}
              >
                Forgot Password?
              </div>
            </div>
            <div className="flex w-full items-center justify-center">
              <Button
                testId="submit"
                disabled={false}
                className="text-md block w-full cursor-pointer rounded bg-sky-500 px-8 py-2 text-center font-bold text-white hover:bg-sky-400 focus:outline-none"
                label={`${isLoading ? 'LOGIN IN PROGRESS...' : 'LOGIN'}`}
                onClick={onLoginUser}
              />
            </div>
          </div>
          <hr />
          <div className="px-5 py-4">
            <div className="ml-2 flex w-full justify-center text-sm font-medium">
              <div className="flex justify-center">
                Not yet a memeber?<>&nbsp;</>
                <p
                  onClick={() => {
                    if (onToggle) {
                      onToggle(true);
                    }
                  }}
                  className="ml-2 flex cursor-pointer text-blue-600 hover:underline"
                >
                  Join Now
                </p>
              </div>
            </div>
          </div>
        </div>
      </ModalContainer>
    </>
  );
};

export default LoginModal;
