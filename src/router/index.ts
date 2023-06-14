import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";
import ComicsDetailView from "../views/ComicDetailView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "MainView",
      component: MainView,
    },
    {
      name: "ComicsViewPage",
      path: "/comics/:id",
      component: ComicsDetailView,
    },
  ],
});

export default router;
