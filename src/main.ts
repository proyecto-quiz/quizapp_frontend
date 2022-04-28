import { createApp } from 'vue';
import router from '@/routers';
import { createPinia } from 'pinia';

import NBApp from '@/NBApp.vue';

// css
import '@/styles/main.css';

// icons
import 'boxicons';
import { useAuthStore } from './stores';

const app = createApp(NBApp);
const piniaStore = createPinia();

app.use(piniaStore);
await useAuthStore(piniaStore).meAction();

app.use(router);
app.mount('#quiz-app', true);
