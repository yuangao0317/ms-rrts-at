import { ChangeEvent, FC, FormEvent, ReactElement, RefObject, useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Button from 'src/shared/buttons/Button';
import TextInput from 'src/shared/inputs/TextInput';
import { categories } from 'src/shared/utils/constants';
import { replaceSpacesWithDash } from 'src/shared/utils/utils.service';
import Typed from 'typed.js';
import { v4 as uuidv4 } from 'uuid';

// const categories: string[] = ['Graphics & Design', 'Digital Marketing', 'Writing & Translation', 'Programming & Tech'];
const Hero: FC = (): ReactElement => {
  const typedElement: RefObject<HTMLSpanElement> = useRef<HTMLSpanElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    const script: HTMLScriptElement = document.createElement('script');
    script.src = 'src/assets/js/TweenLite.min.js';
    script.async = false;
    document.body.appendChild(script);

    const script2: HTMLScriptElement = document.createElement('script');
    script2.src = 'src/assets/js/EasePack.min.js';
    script2.async = false;
    document.body.appendChild(script2);

    const script1: HTMLScriptElement = document.createElement('script');
    script1.src = 'src/assets/js/canvas.js';
    script1.async = false;
    document.body.appendChild(script1);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: categories(),
      startDelay: 300,
      typeSpeed: 120,
      backSpeed: 200,
      backDelay: 300,
      loop: true,
      loopCount: 6
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const navigateToSearchPage = (): void => {
    const url = ``;
    navigate(url);
  };

  const handleTextInputChange = (event: ChangeEvent) => {
    setSearchTerm((event.target as HTMLInputElement).value);
  };

  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault();
    navigateToSearchPage();
  };

  return (
    <section id="hightlight-content" className="relative bg-white pb-20 pt-40 dark:bg-gray-900 lg:pt-28">
      <canvas id="demo-canvas" className="absolute max-w-full"></canvas>
      <div className="relative m-auto px-6 xl:container md:px-12 lg:px-6">
        <h3 className="mb-4 mt-4 max-w-2xl pb-2 text-center text-2xl font-normal dark:text-white lg:text-left animate__animated animate__fadeInDown">
          Expert categories: <span ref={typedElement}></span>
        </h3>
        <h1 className="text-center text-4xl font-black text-blue-900 dark:text-white sm:mx-auto sm:w-10/12 sm:text-5xl md:w-10/12 md:text-5xl lg:w-auto lg:text-left  animate__animated animate__fadeInDown">
          Hire top-notch freelance experts <br className="hidden lg:block" />{' '}
          <span className="relative bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">
            to elevate your projects
          </span>
          .
        </h1>
        <div className="lg:flex">
          <div className="relative mt-8 space-y-8 text-center sm:mx-auto sm:w-10/12 md:mt-16 md:w-2/3 lg:ml-0 lg:mr-20 lg:w-7/12 lg:text-left animate__animated animate__fadeInUp">
            <p className="text-gray-700 dark:text-gray-300 sm:text-lg lg:w-11/12">
              Find the right freelance service for your next project.
            </p>

            <div className="flex w-full justify-between gap-6 lg:gap-12">
              <form className="mx-auto flex w-full items-center bg-white" onSubmit={handleSearchSubmit}>
                <div className="w-full">
                  <TextInput
                    id="search"
                    name="search"
                    type="search"
                    className="w-full rounded-full px-4 py-1 text-gray-800 focus:outline-none"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleTextInputChange}
                  />
                </div>
                <div className="bg-sky-500">
                  <Button
                    type="submit"
                    className="flex h-12 w-12 items-center justify-center text-white"
                    label={<FaSearch className="h-5 w-5" />}
                    onClick={navigateToSearchPage}
                  />
                </div>
              </form>
            </div>

            <div className="grid grid-cols-3 gap-x-2 gap-y-4 sm:flex sm:justify-center lg:justify-start">
              {categories()
                .slice(0, 4)
                .map((category: string) => (
                  <div
                    key={uuidv4()}
                    className="w-full min-w-0 cursor-pointer rounded-full border border-gray-200 p-4 duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-600/20 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-cyan-300/30"
                  >
                    <div className="flex justify-center">
                      <span className="block truncate font-medium dark:text-white">
                        <a href={`/search/categories/${replaceSpacesWithDash(category)}`}>{category}</a>
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="-right-10 hidden lg:-mt-10 xl:-mt-20 lg:flex animate__animated animate__zoomIn">
            <div className="relative">
              <img src="src/assets/images/hero-coop.png" className="relative hvr-grow" alt="" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
