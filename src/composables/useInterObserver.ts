import { onMounted, onUnmounted } from 'vue';

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

  onMounted(() => {
    const elementsDOM = document.querySelectorAll(options.queryAllSelector);

    elementsDOM.forEach((el) => {
      observer.observe(el);
    });
  });

  onUnmounted(() => {
    const elementsDOM = document.querySelectorAll(options.queryAllSelector);

    elementsDOM.forEach((el) => {
      observer.unobserve(el);
    });
  });

  return observer;
}
