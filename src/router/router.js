import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: "/prayers",
    name: "Prayers",
    component: () => import("../components/Prayers/PrayerScreen.vue"),
  },
  {
    path: "/prayers/:id",
    name: "Prayer",
    component: () => import("../components/Prayers/PrayerSinglePage.vue"),
  },

  {
    path: "/reading",
    name: "BibleReading",
    component: () => import("../components/BibleReading/Progress.vue"),
  },
  {
    path: "/reading/:day",
    name: "Reading",
    component: () => import("../components/BibleReading/SingleRead.vue"),
  },
  {
    path: "/counter",
    name: "Counter",
    component: () => import("../components/Counter/HelloWorld.vue"),
  },
  {
    path: "/todos",
    name: "Todos",
    component: () => import("../components/Todo/ToDoList.vue"),
  },
  {
    path: "/timers",
    name: "TimerScreen",
    component: () => import("../components/Timer/TimerScreen.vue"),
  },
  {
    path: "/weather",
    name: "Weather",
    component: () => import("../components/Weather/WeatherScreen.vue"),
  },
  {
    path: "/shopping",
    name: "ShoppingList",
    component: () => import("../components/ShoppingList/ShoppingList.vue"),
  },
]

const router = new VueRouter({
  routes,
  linkActiveClass: "is-active",
})

export default router
