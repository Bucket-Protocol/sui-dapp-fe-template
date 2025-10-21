'use client';

import { ToastContainer } from 'react-toastify';

const WrappedToastContainer = () => (
  <ToastContainer
    theme="dark"
    className="bottom-1 right-3 z-toast sm:bottom-[94px]"
    toastClassName="flex py-3.5 px-4 min-h-10 rounded-md  cursor-pointer bg-white/7 backdrop-blur-md mx-3 sm:mx-0 mb-2"
    position="bottom-right"
    draggable={true}
  />
);

export default WrappedToastContainer;
