import { FC, LazyExoticComponent, ReactElement, lazy } from 'react';
import { Link } from 'react-router-dom';
import { IHeader } from 'src/shared/headers/interfaces/header.interface';
import { IButtonProps } from 'src/shared/props.interface';

const Button: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/buttons/Button'));

const Header: FC<IHeader> = ({ navClass }): ReactElement => {
  return (
    <header>
      <nav className={navClass}>
        <div className="m-auto px-6 xl:container md:px-12 lg:px-6">
          <div className="flex flex-wrap items-center justify-between gap-6 md:gap-0 md:py-3 lg:py-5">
            <div className="flex w-full items-center justify-between lg:w-auto">
              <Link to="/" className="relative z-10 cursor-pointer text-3xl font-semibold text-white">
                FreelanPo
              </Link>
              <div className="peer-checked:hamburger relative z-20 -mr-6 block cursor-pointer p-6 lg:hidden">
                <Button className="m-auto h-0.5 w-5 rounded transition duration-300" label="label" />
              </div>
            </div>
            <div className="navmenu mb-16 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl shadow-gray-300/20 dark:border-gray-700 dark:shadow-none md:flex-nowrap lg:m-0 lg:flex lg:w-7/12 lg:space-y-0 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">


              <div className="border-primary/10 -ml-1 flex w-full flex-col space-y-2 dark:border-gray-700 sm:flex-row md:w-max lg:space-y-0 lg:border-l">
                <div
                  className="relative ml-auto flex h-9 items-center justify-center before:absolute
                            before:inset-0 before:rounded-full before:transition before:duration-300
                            hover:before:scale-105 focus:before:bg-sky-600/10 active:duration-75 active:before:scale-95
                            dark:focus:before:bg-sky-400/10 sm:px-6 hvr-pulse-grow cursor-pointer"
                >
                  <span className="relative text-sm font-semibold text-gray-600 hover:text-sky-400 dark:text-gray-300">Sign In</span>
                </div>
                <div
                  className="relative ml-auto flex h-9 items-center justify-center rounded-full bg-sky-500
                            text-white font-bold sm:px-6 hover:bg-sky-400 hvr-fade cursor-pointer"
                >
                  <span className="relative text-sm font-semibold text-white">Sign Up</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
