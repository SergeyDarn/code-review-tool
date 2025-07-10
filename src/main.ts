import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';
import ThemePreset from './theme';

const app = createApp(App)

app.use(router)

app.use(PrimeVue, {
    theme: {
        preset: ThemePreset
    }
});

app.mount('#app')
