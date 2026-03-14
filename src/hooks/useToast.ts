import { useToastStore } from '../store/toastStore';

export const useToast = () => {
  const { addToast, removeToast } = useToastStore();
  return { addToast, removeToast };
};
