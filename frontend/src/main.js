import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { getToken, removeRefreshToken, removeToken } from "./services/auth";
import store from "./store";

createApp(App).use(router).mount("#app");

window.addEventListener('beforeunload', () => {
    if (getToken()) {
        removeToken();
        removeRefreshToken();
    }
})