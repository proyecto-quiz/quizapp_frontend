import { useAuthStore } from '@/stores';
import { storeToRefs } from 'pinia';

// Using in DOM
export function useAuthRef() {
  return storeToRefs(useAuthStore());
}

// Using in setup
export function useAuth() {
  const { resetAction, ...rest } = useAuthStore();

  const reset = () => {
    resetAction();
  };
  return {
    ...rest,
    reset,
  };
}
