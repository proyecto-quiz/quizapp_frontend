import { createApp } from 'vue';
import router from '@/routers';

import QuizApp from '@/QuizApp.vue';

// css
import '@/styles/main.css';

createApp(QuizApp).use(router).mount('#quiz-app', true);
