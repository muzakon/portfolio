import { createApp } from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";

import "ant-design-vue/dist/reset.css";
import "@/assets/style/tailwind.css";
import "@/assets/style/global.less";

import router from "@/router";

createApp(App).use(router).use(Antd).mount("#app");
