import countries, { LocalizedCountryNames } from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

export const lowerCase = (str: string): string => {
  return str.toLowerCase();
};

export const replaceSpacesWithDash = (title: string): string => {
  const lowercaseTitle: string = lowerCase(`${title}`);
  return lowercaseTitle.replace(/\/| /g, '-'); // replace / and space with -
};

export const getDataFromSessionStorage = (key: string) => {
  const data = window.sessionStorage.getItem(key) as string;
  return JSON.parse(data);
};

countries.registerLocale(enLocale);
export const countriesList = (): string[] => {
  const countriesObj: LocalizedCountryNames<{ select: 'official' }> = countries.getNames('en', { select: 'official' });
  return Object.values(countriesObj);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleCatchError = (err: any): string => {
  if ('status' in err) {
    if (err.status === 404) {
      return 'Endpoint not found. Please check the URL.';
    } else if (err.status === 400) {
      return 'Bad Request. Please check the input data.';
    } else {
      return err.data ? 'An unexpected error occurred. Please try again.' : (err.data.message as string);
    }
  }

  return 'An unexpected error occurred. Please try again.';
};
