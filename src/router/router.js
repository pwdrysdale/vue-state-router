import Vue from "vue";
import VueRouter from "vue-router";

import App from "../App.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "App",
    component: App,
  },
  {
    path: "/counter",
    name: "Counter",
    component: () => import("../components/HelloWorld.vue"),
  },
  {
    path: "/todos",
    name: "Todos",
    component: () => import("../components/ToDoList.vue"),
  },
  {
    path: "/timers",
    name: "TimerScreen",
    component: () => import("../components/TimerScreen.vue"),
  },
];

const router = new VueRouter({
  routes,
  linkActiveClass: "is-active",
});

export default router;
