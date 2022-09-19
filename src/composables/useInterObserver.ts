import { onMounted, onUnmounted, ref } from 'vue';

type Options = {
  queryAllSelector: string;
  init?: IntersectionObserverInit;
};

type Callback = (entry: IntersectionObserverEntry) => void;

/**
 * Hook: IntersectionObserver
 * @param callback
 * @param options
 */
export function useInterObserver(callback: Callback, options: Options) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(callback);
  }, options.init);

  const elementsDOM = ref<NodeListOf<Element>>();

  onMounted(() => {
    elementsDOM.value = document.querySelectorAll(options.queryAllSelector);

    elementsDOM.value.forEach((el) => {
      observer.observe(el);
    });
  });

  onUnmounted(() => {
    elementsDOM.value?.forEach((el) => {
      observer.unobserve(el);
    });
  });

  return observer;
}
