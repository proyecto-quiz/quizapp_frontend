import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from '@/routers';

import NBApp from '@/NBApp.vue';

// css
import '@/styles/main.css';

// icons
import 'boxicons';

const app = createApp(NBApp);
const piniaStore = createPinia();
app.use(piniaStore);
app.use(router);
app.mount('#quiz-app', true);
