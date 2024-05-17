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

export interface ApiErrorResponse {
  status: number;
  data: { message: string; errors: { [k: string]: string[] } };
}
export function isApiResponseError(error: unknown): error is ApiErrorResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return typeof error === 'object' && error != null && 'status' in error && typeof (error as any).status === 'number';
}
export const handleCatchFetchError = (err: ApiErrorResponse): string => {
  if (err.status === 404) {
    return 'Endpoint not found. Please check the URL.';
  } else if (err.status === 400) {
    return 'Bad Request. Please check the input data.';
  } else {
    return err.data.message || 'An unexpected error occurred. Please try again.';
  }
};
