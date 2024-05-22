export const headerValue = {
  index: 'index',
  home: 'home'
} as const;

export const AUTH_FETCH_STATUS = {
  IDLE: '',
  SUCCESS: 'success',
  ERROR: 'error'
} as const;

export const categories = (): string[] => {
  return [
    'Graphics & Design',
    'Digital Marketing',
    'Writing & Translation',
    'Video & Animation',
    'Music & Audio',
    'Programming & Tech',
    'Photography',
    'Data',
    'Business'
  ];
};
