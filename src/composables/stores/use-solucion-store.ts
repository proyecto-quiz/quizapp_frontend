import { useSolucionStore } from '@/stores';
import { storeToRefs } from 'pinia';

// Using in DOM
export function useSolucionRef() {
  return storeToRefs(useSolucionStore());
}
