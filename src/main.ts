import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from '@/routers';

import NBApp from '@/NBApp.vue';

// css
import '@/styles/main.css';
import { setTokenAuth } from './plugins';

//registerSW
import { registerSW } from 'virtual:pwa-register';
const app = createApp(NBApp);
const piniaStore = createPinia();

app.use(piniaStore);
app.use(router);
piniaStore.use(setTokenAuth);
app.mount('#noteblue-app', true);

const updateSW = registerSW({
  onNeedRefresh() {
    // show a prompt to user
    if (window.confirm('Tenemos una actualización ¿desea actualizar?')) {
      updateSW();
    }
  },
  onOfflineReady() {
    alert('Listo para trabajar sin conexión');
    // show a ready to work offline to user
  },
});
// when user clicked the "refresh" button
updateSW();
// the page will reload and the up-to-date content will be served.
