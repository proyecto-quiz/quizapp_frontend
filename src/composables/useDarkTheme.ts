import { computed, onMounted, ref } from 'vue';

export function changeThemeStorage() {
  const inDark = document.documentElement.classList.contains('dark');
  if (inDark) {
    localStorage.setItem('theme', '');
    document.documentElement.classList.remove('dark');
  } else {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
  }
}

export function useDarkTheme() {
  const isDark = ref(false);
  const handleThemeChange = () => {
    changeThemeStorage();
    isDark.value = !isDark.value;
  };

  onMounted(() => {
    const classes = document.documentElement.classList;
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      isDark.value = true;
      classes.add('dark');
    } else {
      isDark.value = false;
      classes.remove('dark');
    }
  });

  return { isDark: computed(() => isDark.value), handleThemeChange };
}
