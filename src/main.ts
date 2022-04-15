import { createApp } from 'vue';
import router from '@/routers';
import { createPinia } from 'pinia';

import QuizApp from '@/QuizApp.vue';

// css
import '@/styles/main.css';

// icons
import 'boxicons';

const piniaStore = createPinia();

const app = createApp(QuizApp);
app.use(piniaStore);
app.use(router);
app.mount('#quiz-app', true);
