import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from '@/routers';

import NBApp from '@/NBApp.vue';

// css
import '@/styles/main.css';
import { setTokenAuth } from './plugins';

const app = createApp(NBApp);
const piniaStore = createPinia();

app.use(piniaStore);
app.use(router);
piniaStore.use(setTokenAuth);
app.mount('#noteblue-app', true);
