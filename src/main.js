import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import { routes } from "./routes";
import store from "./store";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes,
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }

    if (savedPosition) {
      return savedPosition;
    }

    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.isAuthRequired)) {
    if (!authService.isLoggedIn) {
      alert("You must be logged in!");
      return next(false);
    }
  }

  next();
});

router.afterEach((to, from) => {
  console.log(to, from);
});

Vue.filter("currency", function (value) {
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return formatter.format(value);
});

export const eventBus = new Vue();
export const authService = { isLoggedIn: false };

new Vue({
  el: "#app",
  render: (h) => h(App),
  router: router,
  store,
});
