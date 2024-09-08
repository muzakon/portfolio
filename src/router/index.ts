import { createWebHashHistory, createRouter } from "vue-router";
import { defineAsyncComponent } from "vue";

import HomeView from "@/views/Index.vue";
import Projects from "@/views/projects/Index.vue";
import { titleToUrl } from "@/utils/functions";
import { projects } from "@/utils/constants";

const projectRoutes = projects.map((x) => ({
  path: `/projects/${titleToUrl(x.title)}`,
  component: defineAsyncComponent(() => import(`@/views/projects/${titleToUrl(x.title)}/Index.vue`)),
  name: titleToUrl(x.title),
  meta: {
    title: x.title,
    subtitle: x.subtitle
  },
}));

const routes = [
  { path: "/", component: HomeView, name: "index" },
  {
    path: "/projects",
    component: Projects,
    name: "projects"
  },
  ...projectRoutes
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
