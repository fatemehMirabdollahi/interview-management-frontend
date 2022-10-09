import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./services/api";
import BootstrapVue3 from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import vClickOutside from "click-outside-vue3";

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app
  .use(store)
  .use(router)
  .use(BootstrapVue3)
  .use(vClickOutside)
  .use(require("vue3-jalali-moment"))
  .mount("#app");
