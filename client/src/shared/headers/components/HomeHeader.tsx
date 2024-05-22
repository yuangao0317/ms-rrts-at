import { Transition } from '@headlessui/react';
import { FC, ReactElement, useCallback, useRef, useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaBars, FaRegBell, FaRegEnvelope, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Id, toast } from 'react-toastify';
import { addAuthUser } from 'src/features/auth/reducers/auth.reducer';
import { useResendEmailMutation } from 'src/features/auth/services/auth.service';
import ResendEmailBanner from 'src/shared/banners/ResendEmailBanner';
import Button from 'src/shared/buttons/Button';
import { IResponse } from 'src/shared/common.interface';
import SettingsDropdown from 'src/shared/dropdowns/SettingsDropdown';
import { IHomeHeaderProps } from 'src/shared/headers/interfaces/header.interface';
import { updateCategoryContainer } from 'src/shared/headers/reducers/category.reducer';
import { updateHeader } from 'src/shared/headers/reducers/header.reducer';
import useDetectOutsideClick from 'src/shared/hooks/useDetectOutsideClick';
import { categories } from 'src/shared/utils/constants';
import { replaceSpacesWithDash } from 'src/shared/utils/utils.service';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';
import { v4 as uuidv4 } from 'uuid';

const HomeHeader: FC<IHomeHeaderProps> = ({ showCategoryContainer }): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const logout = useAppSelector((state: IReduxState) => state.logout);

  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  // const settingsDropdownRef = useRef<HTMLDivElement | null>(null);
  const [settingsDropdownRef, isSettingsDropdown, setIsSettingsDropdown] = useDetectOutsideClick<HTMLDivElement>(false);
  const navElement = useRef<HTMLDivElement | null>(null);

  const [resendEmail] = useResendEmailMutation();
  const dispatch = useAppDispatch();

  const toastRef = useRef<Id | null>(null);

  const onResendEmail = async (): Promise<void> => {
    if (toastRef.current) {
      toast.dismiss(toastRef.current);
    }
    try {
      const result: IResponse = await resendEmail({ userId: authUser.id as number, email: `${authUser.email}` }).unwrap();
      dispatch(addAuthUser({ authInfo: result.user }));
      toastRef.current = toast.success('Email sent successfully.');
    } catch (error) {
      toastRef.current = toast.error('Error sending email.');
    }
  };

  const toggleDropdown = useCallback((): void => {
    setIsSettingsDropdown(!isSettingsDropdown);
  }, [isSettingsDropdown, setIsSettingsDropdown]);

  const slideLeft = (): void => {
    if (navElement.current) {
      const maxScrollLeft = navElement.current.scrollWidth + navElement.current.clientWidth; // maximum scroll position
      navElement.current.scrollLeft = navElement.current.scrollLeft < maxScrollLeft ? navElement.current.scrollLeft - 1000 : maxScrollLeft;
    }
  };

  const slideRight = (): void => {
    if (navElement.current) {
      const maxScrollLeft = navElement.current.scrollWidth - navElement.current.clientWidth; // maximum scroll position
      navElement.current.scrollLeft = navElement.current.scrollLeft < maxScrollLeft ? navElement.current.scrollLeft + 1000 : maxScrollLeft;
    }
  };

  return (
    <>
      {openSidebar && <>open sidebar</>}
      <header>
        <nav className="navbar peer-checked:navbar-active relative z-[120] w-full border-b bg-white shadow-2xl shadow-gray-600/5 backdrop-blur dark:shadow-none">
          {!logout && authUser && !authUser.emailVerified && (
            <ResendEmailBanner
              bgColor="bg-warning"
              showLink={true}
              linkText="Resend email"
              text="Please verify your email before you proceed."
              onClick={onResendEmail}
            />
          )}
          <div className="m-auto px-6 xl:container md:px-12 lg:px-6">
            <div className="flex flex-wrap items-center justify-between gap-6 md:gap-0 md:py-3 lg:py-5">
              <div className="flex w-full gap-x-4 lg:w-6/12">
                <div className="hidden w-full md:flex">
                  <label htmlFor="hbr" className="peer-checked:hamburger relative z-20 -ml-4 block cursor-pointer p-6 lg:hidden">
                    <Button
                      className="m-auto flex h-0.5 w-5 items-center rounded transition duration-300"
                      onClick={() => setOpenSidebar(!openSidebar)}
                      label={
                        <>{openSidebar ? <FaTimes className="h-6 w-6 text-sky-500" /> : <FaBars className="h-6 w-6 text-sky-500" />}</>
                      }
                    />
                  </label>
                  <div className="w-full gap-x-4 md:flex">
                    <Link
                      to="/"
                      onClick={() => {
                        dispatch(updateHeader('home'));
                        dispatch(updateCategoryContainer(true));
                      }}
                      className="relative z-10 flex cursor-pointer justify-center self-center text-2xl font-semibold text-black lg:text-3xl"
                    >
                      FreelanPo
                    </Link>
                  </div>
                </div>
              </div>
              <div className="navmenu mb-16 hidden w-full cursor-pointer flex-wrap items-center justify-end space-y-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-6/12 lg:space-y-0 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
                <div className="text-[#74767e] lg:pr-4">
                  <ul className="flex text-base font-medium">
                    <li className="relative z-50 flex cursor-pointer items-center">
                      <Button
                        className="px-4"
                        label={
                          <>
                            <FaRegBell />

                            <span className="absolute -top-0 right-0 mr-3 inline-flex h-[6px] w-[6px] items-center justify-center rounded-full bg-[#ff62ab]"></span>
                          </>
                        }
                      />
                    </li>
                    <li className="relative z-50 flex cursor-pointer items-center">
                      <Button
                        className="relative px-4"
                        label={
                          <>
                            <FaRegEnvelope />

                            <span className="absolute -top-1 right-0 mr-2 inline-flex h-[6px] w-[6px] items-center justify-center rounded-full bg-[#ff62ab]"></span>
                          </>
                        }
                      />
                    </li>

                    <li className="relative z-50 flex cursor-pointer items-center">
                      <Button
                        className="relative flex gap-2 px-3 text-base font-medium"
                        onClick={toggleDropdown}
                        label={
                          <>
                            <img src={`${authUser.profilePicture}`} alt="profile" className="h-7 w-7 rounded-full object-cover" />
                            {authUser.username && (
                              <span className="absolute bottom-0 left-8 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-400"></span>
                            )}
                            <span className="flex self-center">{authUser.username}</span>
                          </>
                        }
                      />
                      <Transition
                        ref={settingsDropdownRef}
                        show={isSettingsDropdown}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <div className="absolute top-10 left-4 z-50 w-96">
                          <SettingsDropdown authUser={authUser} setIsDropdownOpen={setIsSettingsDropdown} />
                        </div>
                      </Transition>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {showCategoryContainer && (
            <div className="border-grey z-40 hidden w-full border border-x-0 border-b-0 sm:flex">
              <div className="justify-left md:justify-left container mx-auto flex px-6 lg:justify-center">
                <span onClick={slideLeft} className="flex w-auto cursor-pointer self-center pr-1 xl:hidden">
                  <FaAngleLeft size={20} />
                </span>
                <div
                  ref={navElement}
                  className="relative inline-block h-full w-full items-center gap-6 overflow-x-auto scroll-smooth whitespace-nowrap py-2 text-sm font-medium lg:flex lg:justify-between"
                >
                  {categories().map((category: string) => (
                    <span key={uuidv4()} className="mx-4 cursor-pointer first:ml-0 hover:text-sky-400 lg:mx-0">
                      <Link to={`/categories/${replaceSpacesWithDash(category)}`}>{category}</Link>
                    </span>
                  ))}
                </div>
                <span onClick={slideRight} className="flex w-auto cursor-pointer self-center pl-1 xl:hidden">
                  <FaAngleRight size={20} />
                </span>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default HomeHeader;
