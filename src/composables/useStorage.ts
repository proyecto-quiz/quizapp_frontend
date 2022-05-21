import { computed, ComputedRef, onMounted, reactive, ref } from 'vue';

type UseStorage<T> = [T, (value: T) => void, ComputedRef<T>];

function serializerJSON(value: any) {
  try {
    return JSON.stringify(value);
  } catch (error) {
    throw Error('Failed serializer');
  }
}

function deserializerJSON(value: any) {
  try {
    return JSON.parse(value);
  } catch (_e) {
    return value;
  }
}

function getValue(key: string, value: any, s: Storage) {
  const valueStorage = s.getItem(key);
  if (typeof valueStorage !== 'undefined') {
    return deserializerJSON(valueStorage);
  } else return value;
}

function useStorage<T>(key: string, value: T | undefined, storage: Storage): UseStorage<T> {
  const state = reactive({ value: getValue(key, value, storage) });

  onMounted(() => {
    if (state.value === null || state.value === undefined) return storage.removeItem(key);
    else storage.setItem(key, serializerJSON(state.value));
  });

  const setValue = (newValue: T) => {
    state.value = newValue;
    storage.setItem(key, serializerJSON(state.value));
  };

  return [state.value, setValue, computed(() => state.value)];
}

export function useSessionStorage<T = any>(key: string, value?: T) {
  return useStorage<T>(key, value, sessionStorage);
}

export function useLocalStorage<T = any>(key: string, value?: T) {
  return useStorage<T>(key, value, localStorage);
}

function getVal<T>(key: string, s: Storage) {
  const valueStorage = s.getItem(key);
  if (typeof valueStorage !== 'undefined') {
    return deserializerJSON(valueStorage) as T;
  } else return;
}

// Getters
export function useGetStorage<T = any>(key: string, obj: 'local' | 'session' = 'local') {
  return ref(getVal<T>(key, obj === 'local' ? localStorage : sessionStorage)).value;
}
