import { computed, onMounted, onUnmounted, ref } from 'vue';

export function useMediaQuery(queryMatch: string) {
  const mediaQuery = ref(window.matchMedia(queryMatch).matches);

  const query = window.matchMedia(queryMatch);
  const listener = (ev: MediaQueryListEvent) => {
    mediaQuery.value = ev.matches;
  };

  onMounted(() => {
    query.addEventListener('change', listener);
  });

  onUnmounted(() => {
    query.removeEventListener('change', listener);
  });

  return computed(() => mediaQuery.value);
}
