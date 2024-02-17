import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import VeeValidatePlugin from '@/includes/validation';
import { firebaseAuth } from './includes/firebase';

let app: ReturnType<typeof createApp>;
firebaseAuth.onAuthStateChanged(() => {
  if (app !== undefined) return;
  app = createApp(App);

  app.use(router);
  app.use(createPinia());
  app.use(VeeValidatePlugin);

  app.mount('#app');
});
