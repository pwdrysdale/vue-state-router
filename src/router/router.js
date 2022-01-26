import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
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
