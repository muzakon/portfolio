import { createApp } from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";

import "ant-design-vue/dist/reset.css";
import "@/assets/style/tailwind.css";

createApp(App).use(Antd).mount("#app");
