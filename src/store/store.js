import Vue from "vue";
import Vuex from "vuex";

import { v4 as uuid } from "uuid";

import counterMutations from "./counterMutations";
import counterActions from "./counterActions";

import todoMutations from "./todoMutations";
import todoActions from "./todoActions";

import timerMutations from "./timerMutations";
import appNameMutations from "./appNameMutations";
import appNameActions from "./appNameActions";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    name: "Pete's Toolkit Store",
    counters: [
      {
        id: uuid(),
        name: "Counter 1",
        count: 0,
        increment: 1,
      },
    ],
    todos: [
      {
        id: uuid(),
        text: "Welcome to your todo list!",
        completed: true,
        dueDate: new Date(),
        createdDate: new Date(),
        priority: 3,
      },
    ],
    timers: [
      {
        id: uuid(),
        timerName: "Default Timer",
        time: 0,
        interval: null,
      },
    ],
  },
  mutations: {
    ...todoMutations,
    ...counterMutations,
    ...timerMutations,
    ...appNameMutations,
  },
  actions: {
    ...todoActions,
    ...counterActions,
    ...appNameActions,
  },
});

export default store;
