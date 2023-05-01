import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { getToken, removeRefreshToken, removeToken } from "./services/auth";
import store from "./store";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

createApp(App).use(router).component('QuillEditor', QuillEditor).mount("#app");

window.addEventListener('beforeunload', () => {
    if (getToken()) {
        removeToken();
        removeRefreshToken();
    }
})