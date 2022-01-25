import Vue from "vue";
import Vuex from "vuex";

import { v4 as uuid } from "uuid";

import counterMutations from "./counterMutations";

import todoMutations from "./todoMutations";
import todoActions from "./todoActions";

import timerMutations from "./timerMutations";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
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
  },
  actions: {
    ...todoActions,
  },
});

export default store;
