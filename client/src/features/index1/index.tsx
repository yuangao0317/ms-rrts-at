import { FC, LazyExoticComponent, ReactElement, Suspense, lazy, useEffect } from 'react';
import { IHeader } from 'src/shared/headers/interfaces/header.interface';

const IndexHeader: LazyExoticComponent<FC<IHeader>> = lazy(() => import('src/shared/headers/components/Header'));
const IndexHero1: LazyExoticComponent<FC> = lazy(() => import('src/features/index1/Hero'));

const Index1: FC = (): ReactElement => {
  return (
    <>
      <div className="flex flex-col">
        <Suspense>
          <IndexHeader navClass="navbar peer-checked:navbar-active fixed z-20 w-full border-b border-gray-100 bg-white/90 shadow-2xl shadow-gray-600/5 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-none" />
          <IndexHero1 />
        </Suspense>
      </div>
    </>
  );
};
export default Index1;
