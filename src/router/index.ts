import { createWebHashHistory, createRouter } from "vue-router";

import HomeView from "@/views/index.vue";
import Projects from "@/views/projects/index.vue";
import Experience from "@/views/experience/index.vue";


const routes = [
  { path: "/", component: HomeView, name: "index" },
  {
    path: "/projects",
    component: Projects,
    name: "projects",
  },
  {
    path: "/experience",
    component: Experience,
    name: "experience",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
