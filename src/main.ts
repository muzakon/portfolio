import { createApp } from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import Vue3Spline from "vue3-spline";
import VueTyped from "vue3-typed-js";

import "ant-design-vue/dist/reset.css";
import "@/assets/style/tailwind.css";
import "@/assets/style/global.less";

import router from "@/router";

createApp(App)
  .use(router)
  .use(Antd)
  .use(Vue3Spline)
  .use(VueTyped)
  .mount("#app");
