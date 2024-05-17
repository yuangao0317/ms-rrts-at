import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames';
import { ChangeEvent, FC, ReactElement, useCallback, useRef, useState } from 'react';
import { FaCamera, FaChevronLeft, FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { useAuthSchema } from 'src/features/auth/hooks/useAuthSchema';
import { ISignUpPayload } from 'src/features/auth/interfaces/auth.interface';
import { registerUserSchema } from 'src/features/auth/schemas/auth.schema';
import { useSignUpMutation } from 'src/features/auth/services/auth.service';
import Alert from 'src/shared/alerts/Alert';
import Button from 'src/shared/buttons/Button';
import { IModalContainerProps, IResponse, validationErrorsType } from 'src/shared/common.interface';
import Dropdown from 'src/shared/dropdowns/Dropdown';
import TextInput from 'src/shared/inputs/TextInput';
import ModalContainer from 'src/shared/modals/ModalContainer';
import { checkImage, readAsBase64 } from 'src/shared/utils/image.utils';
import { countriesList } from 'src/shared/utils/utils.service';

const RegisterModal: FC<IModalContainerProps> = ({ onClose, onToggle }): ReactElement => {
  const [userInfo, setUserInfo] = useState<ISignUpPayload>({
    username: '',
    password: '',
    email: '',
    country: '',
    profilePicture: ''
  });
  const [step, setStep] = useState<number>(1);
  const [passwordType, setPasswordType] = useState<string>('password');
  const [selectedCountry, setSelectedCountry] = useState<string>('Select Country');
  const [schemaValidation] = useAuthSchema({ schema: registerUserSchema, userInfo });
  const [signUp, { error, isLoading }] = useSignUpMutation();
  const [alertMessage, setAlertMessage] = useState<string>('');

  const [profileImage, setProfileImage] = useState<string>('https://placehold.co/330x220?text=Profile+Image');
  const [showImageSelect, setShowImageSelect] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    async (event: ChangeEvent): Promise<void> => {
      const target: HTMLInputElement = event.target as HTMLInputElement;
      if (target.files) {
        const file: File = target.files[0];
        const isValid = checkImage(file, 'image');
        if (isValid) {
          const dataImage: string | ArrayBuffer | null = await readAsBase64(file);
          setProfileImage(`${dataImage}`);
          setUserInfo({ ...userInfo, profilePicture: `${dataImage}` });
        }
        setShowImageSelect(false);
      }
    },
    [userInfo]
  );

  const onRegisterUser = useCallback(async (): Promise<void> => {
    try {
      const [isValid, recievedErrors]: [boolean, validationErrorsType[]] = await schemaValidation();
      if (isValid) {
        console.log(userInfo);
        const result: IResponse = await signUp(userInfo).unwrap();

        console.log(result);
      } else {
        setAlertMessage(Object.values(recievedErrors[0])[0] as string);
      }
    } catch (err) {
      // setAlertMessage(error?.data.message);
      console.log(err);
      if ('status' in err) {
        if (err.status === 404) {
          toast.error('Endpoint not found. Please check the URL.');
        } else if (err.status === 400) {
          toast.error('Bad Request. Please check the input data.');
        } else {
          toast.error(err.data ? 'An unexpected error occurred. Please try again.' : err.data.message);
        }
      }
    }
  }, [schemaValidation, userInfo, signUp]);

  const onHandleDropdownSelect = useCallback(
    (item: string) => {
      setSelectedCountry(item);
      setUserInfo({ ...userInfo, country: item });
    },
    [userInfo]
  );

  const handleDropdownValueChange = useCallback(
    (item: string) => {
      setSelectedCountry(item);
      setUserInfo({ ...userInfo, country: item });
    },
    [userInfo]
  );

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
    setAlertMessage('');
  };
  const buttonClassNames = (): string => {
    console.log('userInfo.country', userInfo.country);
    const isDisabled = !userInfo.country || !userInfo.profilePicture;
    return classNames('text-md block w-full rounded px-8 py-2 text-center font-bold text-white focus:outline-none', {
      'bg-sky-500 cursor-pointer hover:bg-sky-400': !isDisabled,
      'bg-gray-400 cursor-not-allowed hover:bg-gray-400': isDisabled
    });
  };

  return (
    <>
      <ToastContainer
        className="min-w-max"
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ModalContainer>
        <div className="relative top-[10%] mx-auto w-11/12 max-w-md rounded bg-white md:w-2/3">
          <div className="relative px-5 py-5">
            <div className="flex justify-between text-2xl font-bold text-gray-600">
              {step > 1 && (
                <Button
                  className="cursor-pointer rounded text-gray-400 hover:text-gray-600"
                  role="button"
                  onClick={() => setStep(step - 1)}
                  label={<FaChevronLeft className="icon icon-tabler icon-tabler-x" />}
                />
              )}
              <h1 className="flex w-full justify-center">Join FreelanPo</h1>
              <Button
                className="cursor-pointer rounded text-gray-400 hover:text-gray-600"
                role="button"
                label={<FaTimes className="icon icon-tabler icon-tabler-x" />}
                onClick={onClose}
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-center px-5 py-5">
            <ol className="flex w-full">
              <li className="flex w-full items-center text-white after:inline-block after:h-1 after:w-full after:border-4 after:border-b after:border-sky-500 after:content-[''] dark:after:border-sky-500">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500 font-bold dark:bg-sky-500 lg:h-12 lg:w-12">
                  1
                </span>
              </li>
              <li className="flex items-center">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-white lg:h-12 lg:w-12 ${
                    step === 2 ? 'bg-sky-500 dark:bg-sky-500' : 'bg-sky-300/50 dark:bg-sky-300/50'
                  }`}
                >
                  2
                </span>
              </li>
            </ol>
          </div>
          <div className="px-5">{alertMessage && <Alert type="error" message={alertMessage} />}</div>

          {step === 1 && (
            <div className="relative px-5 py-5">
              <div>
                <label htmlFor="username" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                  Username
                </label>
                <TextInput
                  id="username"
                  name="username"
                  type="text"
                  value={userInfo.username}
                  className="mb-5 mt-2 flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none"
                  placeholder="Enter username"
                  onChange={handleFormChange}
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                  Email
                </label>
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  value={userInfo.email}
                  className="mb-5 mt-2 flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none"
                  placeholder="Enter email"
                  onChange={handleFormChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                  Password
                </label>
                <div className="relative mb-5 mt-2">
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
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              <Button
                disabled={false}
                className="text-md block w-full cursor-pointer rounded bg-sky-500 px-8 py-2 text-center font-bold text-white hover:bg-sky-400 focus:outline-none"
                label="Continue"
                onClick={() => setStep(2)}
              />
            </div>
          )}
          {step === 2 && (
            <div className="relative px-5 py-5">
              <div className="relative flex flex-col items-center">
                <label htmlFor="profilePicture" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                  Profile Picture
                </label>
                <div
                  onMouseEnter={() => setShowImageSelect(true)}
                  onMouseLeave={() => setShowImageSelect(false)}
                  className="relative mb-5 mt-2 w-[20%] lg:w-[40%] cursor-pointer flex justify-center "
                >
                  {profileImage ? (
                    <img
                      id="profilePicture"
                      src={profileImage}
                      alt="Profile Picture"
                      className="left-0 top-0 h-20 w-20 lg:h-40 lg:w-40 rounded-full bg-white object-cover"
                    />
                  ) : (
                    <div className="left-0 top-0 flex h-20 w-20 lg:h-40 lg:w-40 cursor-pointer rounded-full bg-[#dee1e7]"></div>
                  )}

                  {showImageSelect && (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute left-0 top-0 flex h-20 w-20 lg:h-40 lg:w-40 cursor-pointer justify-center rounded-full bg-[#dee1e7]/20"
                    >
                      <FaCamera className="flex self-center" />
                    </div>
                  )}

                  <TextInput
                    name="image"
                    ref={fileInputRef}
                    type="file"
                    style={{ display: 'none' }}
                    onClick={() => {
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="h-24">
                <label htmlFor="country" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                  Country
                </label>
                <div id="country" className="relative mb-5 mt-2">
                  <Dropdown
                    text={selectedCountry}
                    maxHeight="200"
                    mainClassNames="absolute bg-white z-50"
                    showSearchInput={true}
                    items={countriesList()}
                    setValue={handleDropdownValueChange}
                    onClick={onHandleDropdownSelect}
                  />
                </div>
              </div>
              <Button
                disabled={!userInfo.country || !userInfo.profilePicture}
                className={buttonClassNames()}
                label={`${isLoading ? 'SIGNUP IN PROGRESS...' : 'SIGNUP'}`}
                onClick={onRegisterUser}
              />
            </div>
          )}
          <hr />
          <div className="px-5 py-4">
            <div className="ml-2 flex w-full justify-center text-sm font-medium">
              <div className="flex justify-center">
                Already a memeber?<>&nbsp;</>
                <p
                  onClick={() => {
                    if (onToggle) {
                      onToggle(true);
                    }
                  }}
                  className="ml-2 flex cursor-pointer text-blue-600 hover:underline"
                >
                  Sign In
                </p>
              </div>
            </div>
          </div>
        </div>
      </ModalContainer>
    </>
  );
};

export default RegisterModal;
