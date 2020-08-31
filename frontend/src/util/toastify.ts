import { toast, TypeOptions } from 'react-toastify';


const { TOP_CENTER } = toast.POSITION;

export const notify = (message: string, type: TypeOptions) => {
  toast(message, {
    position: TOP_CENTER,
    type
  });
}