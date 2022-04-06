import { computed, onMounted, onUnmounted, ref } from 'vue';

export function useMediaQuery(q: string) {
  const mediaQuery = ref(window.matchMedia(q).matches);

  let query = window.matchMedia(q);
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
