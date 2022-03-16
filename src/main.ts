import { createApp } from 'vue';
import router from '@/routers';
import { createPinia } from 'pinia';

import QuizApp from '@/QuizApp.vue';

// css
import '@/styles/main.css';

const piniaStore = createPinia();

createApp(QuizApp).use(piniaStore).use(router).mount('#quiz-app', true);
