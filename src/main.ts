import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from '@/routers';

import NBApp from '@/NBApp.vue';

// css
import '@/styles/main.css';

const app = createApp(NBApp);
const piniaStore = createPinia();

app.use(piniaStore);
app.use(router);
app.mount('#noteblue-app', true);
