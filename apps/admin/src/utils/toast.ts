import { useToast } from '@/components/ui/Toast';

// For use in components
export const useToastNotifications = () => {
  const { addToast } = useToast();
  
  const notifySuccess = (message: string) => {
    addToast(message, 'success');
  };

  const notifyError = (message: string) => {
    addToast(message, 'error');
  };

  const notifyInfo = (message: string) => {
    addToast(message, 'info');
  };

  return { notifySuccess, notifyError, notifyInfo };
};

// DEPRECATED: Use useToast hook directly instead
// This is kept for backwards compatibility but will be removed in future versions
export const notifySuccess = (message: string) => {
  console.warn('DEPRECATED: Use useToast hook instead of notifySuccess import');
  console.log('✅ Success:', message);
};

export const notifyError = (message: string) => {
  console.warn('DEPRECATED: Use useToast hook instead of notifyError import');
  console.error('❌ Error:', message);
};

