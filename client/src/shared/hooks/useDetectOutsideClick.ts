import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react';

type UseDetectOutsideClickReturn<T> = [MutableRefObject<T | null>, boolean, Dispatch<SetStateAction<boolean>>];

function useDetectOutsideClick<T extends HTMLElement>(initialState: boolean): UseDetectOutsideClickReturn<T> {
  const [isActive, setIsActive] = useState(initialState);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return [ref, isActive, setIsActive];
}

export default useDetectOutsideClick;
