import VueRouter from "vue-router";

import App from "../App.vue";

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
];

const router = new VueRouter({
  routes,
});

export default router;
