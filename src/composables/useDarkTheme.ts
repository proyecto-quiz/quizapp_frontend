import { onBeforeMount, reactive, ref } from 'vue';
import { useMediaQuery } from './useMediaQuery';
import { useLocalStorage } from './useStorage';

export function useDarkTheme() {
  const matches = useMediaQuery('(prefers-color-scheme: dark)');
  const [value, setValue] = useLocalStorage<boolean>('dark-mode');
  const enabled = value ?? matches.value;

  const isDark = ref(enabled);
  const handleThemeChange = () => {
    isDark.value = !isDark.value;
    setValue(isDark.value);
    document.documentElement.classList.toggle('dark', isDark.value);
  };

  onBeforeMount(() => {
    document.documentElement.classList.toggle('dark', enabled);
  });

  return reactive({ isDark, handleThemeChange });
}
