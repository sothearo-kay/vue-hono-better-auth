import { setupLayouts } from "virtual:generated-layouts";
import { createRouter, createWebHistory } from "vue-router";
import { routes, handleHotUpdate } from "vue-router/auto-routes";
import { getSession } from "@/lib/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
});

router.beforeEach(async (to, from, next) => {
  const session = await getSession();
  const isAuthenticated = !!session.data?.user;

  if (!isAuthenticated && to.path !== "/auth") {
    next("/auth");
  } else if (isAuthenticated && to.path === "/auth") {
    next("/");
  } else {
    next();
  }
});

export default router;

if (import.meta.hot) {
  handleHotUpdate(router);
}
