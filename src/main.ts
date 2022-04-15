import { createApp } from 'vue';
import router from '@/routers';
import { createPinia } from 'pinia';

import NBApp from '@/NBApp.vue';

// css
import '@/styles/main.css';

// icons
import 'boxicons';

const piniaStore = createPinia();

const app = createApp(NBApp);
app.use(piniaStore);
app.use(router);
app.mount('#quiz-app', true);
