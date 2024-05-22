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
    'Programming & Tech',
    'Digital Marketing',
    'Video & Animation',
    'Music & Audio',
    'Writing & Translation',
    'Photography',
    'Data',
    'Business'
  ];
};
