import { Slide, ToastOptions, toast as baseToast } from "react-toastify";

export const defaultOptions: ToastOptions = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  theme: "light",
  transition: Slide,
};

function toast(message: string, options?: ToastOptions) {
  baseToast(message, {
    ...defaultOptions,
    ...options,
  });
}

function success(message: string, options?: ToastOptions) {
  baseToast.success(message, {
    ...defaultOptions,
    ...options,
  });
}

function error(message: string, options?: ToastOptions) {
  baseToast.error(message, {
    ...defaultOptions,
    ...options,
  });
}

function info(message: string, options?: ToastOptions) {
  baseToast.info(message, {
    ...defaultOptions,
    ...options,
  });
}

function warn(message: string, options?: ToastOptions) {
  baseToast.info(message, {
    ...defaultOptions,
    ...options,
  });
}

toast.success = success;
toast.error = error;
toast.info = info;
toast.warn = warn;

export default toast;
