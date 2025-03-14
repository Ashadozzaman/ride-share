import './bootstrap';

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './src/App.vue';
import { router } from './src/routes';

import ToastPlugin from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';


/**
    import.meta.glob(pattern) is a Vite-specific feature that allows dynamic import of multiple files that match a given pattern.
*/

const importIcon = import.meta.glob('./src/components/**/*.vue');
function registerComponent(app) {
    //Object.keys(importIcon) gives an array of file paths.
    for(const filePath of Object.keys(importIcon)){
        const componentName = filePath.split('/').pop()?.replace('.vue','');
        //  importIcon[filePath]() is a function call that triggers the dynamic import.
        // .pop() gets the last element
        // .then(function(data) {...}) waits for the module to load asynchronously.
        importIcon[filePath]().then(function(data){
            app.component(componentName, data?.default);
        }).catch((error) => console.error(error?.message));
    }
}

const app = createApp(App);
const penia = createPinia();
app.use(penia);
app.use(router);
app.use(ToastPlugin);
registerComponent(app);

app.mount('#app');
