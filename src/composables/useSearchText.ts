import { reactive, toRef } from 'vue';

/**
 * Function
 * @param filterByKey
 * @param data
 */
export function useSearchText<T extends Array<any>>(filterByKey: string, data: T) {
  const state = reactive({ data });
  const handleTextFilter = (text: string): void => {
    const filterData = toRef(state, 'data').value as T;

    filterData.filter((d) => d[filterByKey].toLowerCase().includes(text.toLowerCase()));
  };

  return {
    handleTextFilter,
    ...state,
  };
}
