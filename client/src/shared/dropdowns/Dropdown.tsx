import _ from 'lodash';
import { ChangeEvent, FC, MouseEvent, ReactElement, useCallback, useRef, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

import Button from '../buttons/Button';
import { IDropdownProps } from '../common.interface';
import useDetectOutsideClick from '../hooks/useDetectOutsideClick';
import TextInput from '../inputs/TextInput';

const Dropdown: FC<IDropdownProps> = ({
  text,
  maxHeight,
  mainClassNames,
  showSearchInput,
  dropdownClassNames,
  items,
  style,
  setValue,
  onClick
}): ReactElement => {
  const [dropdownItems, setDropdownItems] = useState<string[]>(items);
  const [inputText, setInputText] = useState<string>(text);
  // const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [dropdownRef, toggleDropdown, setToggleDropdown] = useDetectOutsideClick<HTMLDivElement>(false);

  const onHandleSelect = useCallback(
    (event: MouseEvent): void => {
      const selectedItem: string = (event.target as HTMLLIElement).textContent as string;
      if (setValue) {
        setValue(selectedItem);
      }
      setInputText(selectedItem);
      setDropdownItems(items);
      setToggleDropdown(false);
      if (onClick) {
        onClick(selectedItem);
      }
    },
    [setValue, items, setToggleDropdown, onClick]
  );

  const handleFocus = () => {};

  const handleBlur = () => {};

  return (
    <div ref={dropdownRef} className={`w-full divide-y divide-gray-100 rounded border ${mainClassNames}`} style={style}>
      {(!showSearchInput || showSearchInput) && !toggleDropdown && (
        <Button
          className="bg-teal flex w-full justify-between rounded px-3 py-2 text-white"
          label={
            <>
              <span className="truncate text-slate-900">{inputText}</span>
              {!toggleDropdown ? (
                <FaChevronDown className="float-right mt-1 h-4 fill-current text-slate-900" />
              ) : (
                <FaChevronUp className="float-right mt-1 h-4 fill-current text-slate-900" />
              )}
            </>
          }
          onClick={() => setToggleDropdown(!toggleDropdown)}
        />
      )}

      {showSearchInput && toggleDropdown && (
        <div className="flex">
          <TextInput
            type="text"
            name="search"
            value={inputText}
            className="h-10 w-full items-center rounded pl-3 text-sm font-normal text-gray-600 focus:outline-none lg:text-base"
            placeholder="Select Country"
            onChange={(event: ChangeEvent) => {
              const inputValue: string = (event.target as HTMLInputElement).value;
              setInputText(inputValue);
              if (setValue) {
                setValue(inputValue);
              }
              const filtered: string[] = _.filter(dropdownItems, (item: string) => item.toLowerCase().includes(inputValue.toLowerCase()));
              setDropdownItems(filtered);
              if (!inputValue) {
                setDropdownItems(items);
              }
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <div className="flex self-center" onClick={() => setToggleDropdown(!toggleDropdown)}>
            <FaTimes className="mx-3 h-4 fill-current text-slate-900" />
          </div>
        </div>
      )}

      {toggleDropdown && (
        <div>
          <ul
            className={`z-40 cursor-pointer overflow-y-scroll py-2 text-sm text-gray-700 dark:text-gray-200
              ${dropdownClassNames}`}
            style={{ maxHeight: `${maxHeight}px` }}
          >
            {dropdownItems.map((value: string) => (
              <li key={uuidv4()} onClick={onHandleSelect}>
                <div className="block px-4 py-2 text-slate-900 dark:hover:bg-gray-200">{value}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
