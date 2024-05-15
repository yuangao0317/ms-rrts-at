import { FC, ReactElement, RefObject, useRef } from 'react';

const Hero1: FC = (): ReactElement => {
  const typedElement: RefObject<HTMLSpanElement> = useRef<HTMLSpanElement>(null);
  return (
    <div className="relative bg-white pb-20 pt-40 dark:bg-gray-900 lg:pt-28">
      <div className="relative m-auto px-6 xl:container md:px-12 lg:px-6">
        <div className="relative grid grid-cols-1 gap-20 lg:grid-cols-2">
          <div className="">
            <h3 className="mb-4 mt-4 max-w-2xl pb-2 text-center text-2xl font-normal dark:text-white lg:text-left">
              Expert categories: <span ref={typedElement}></span>
            </h3>
            <h1 className="text-center text-4xl font-black text-blue-900 dark:text-white sm:mx-auto sm:w-10/12 sm:text-5xl md:w-10/12 md:text-5xl lg:w-auto lg:text-left xl:text-7xl">
              Hire expert freelancers <br className="hidden lg:block" />{' '}
              <span className="relative bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">
                for your project
              </span>
              .
            </h1>
            <div className="">
              <div className="relative mt-8 space-y-8 text-center sm:mx-auto sm:w-10/12 md:mt-16 md:w-2/3 lg:ml-0 lg:w-auto lg:text-left">
                <p className="text-gray-700 dark:text-gray-300 sm:text-lg lg:w-11/12">
                  Find the right freelance service for your next project.
                </p>

                <div className="flex w-full justify-between gap-6 lg:gap-12">
                  <form className="mx-auto flex w-full items-center bg-white">
                    <div className="w-full">
                      <input
                        type="search"
                        className="w-full rounded-full px-4 py-1 text-gray-800 focus:outline-none"
                        placeholder="Search"
                        defaultValue=""
                      ></input>
                    </div>
                    <div className="bg-sky-500">
                      <button type="submit" className="flex h-12 w-12 items-center justify-center text-white" />
                    </div>
                  </form>
                </div>

                <div className="grid grid-cols-3 gap-x-2 gap-y-4 sm:flex sm:justify-center lg:justify-start">
                  <div className="w-full min-w-0 cursor-pointer rounded-full border border-gray-200 p-4 duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-600/20 dark:border-gray-700 dark:hover:border-cyan-300/30">
                    <div className="flex justify-center">
                      <span className="block truncate font-medium dark:text-white">
                        <a href="{`/search/categories/data`}">Data</a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="-right-10 hidden lg:mt-20 lg:flex">
            <div className="relative w-full">
              <img src="src/assets/hero-coop.png" className="relative w-full" alt="" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero1;
