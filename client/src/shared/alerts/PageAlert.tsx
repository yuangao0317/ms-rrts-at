import { memo } from 'react';
import { ToastContainer } from 'react-toastify';

const PageToastAlert = memo(() => {
  return (
    <ToastContainer
      className="min-w-max"
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
});

export default PageToastAlert;
