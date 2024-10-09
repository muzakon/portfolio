import { createWebHashHistory, createRouter } from "vue-router";

import HomeView from "@/views/Index.vue";
import Projects from "@/views/projects/Index.vue";
import Experience from "@/views/experience/Index.vue";


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
