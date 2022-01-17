import { toast, ToastOptions } from 'react-toastify'

export const toastConfig: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark'
}

export const errorToast = (msg: string) => toast.error(msg, toastConfig)

export const successToast = (msg: string) => toast.success(msg, toastConfig)

export const infoToast = (msg: string) => toast.info(msg, toastConfig)
