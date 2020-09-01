import { toast, TypeOptions } from 'react-toastify';


const { TOP_CENTER } = toast.POSITION;

export const notify = (
  message: string, type: TypeOptions, timeout?: number | false
) => {
  toast(message, {
    position: TOP_CENTER,
    type,
    autoClose: timeout ?? 1500
  });
}