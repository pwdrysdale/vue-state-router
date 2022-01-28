import Vue from "vue";
import Vuex from "vuex";

// import { v4 as uuid } from "uuid";

import counterMutations from "./counterMutations";
import counterActions from "./counterActions";

import todoMutations from "./todoMutations";
import todoActions from "./todoActions";

import timerMutations from "./timerMutations";

import appNameMutations from "./appNameMutations";
import appNameActions from "./appNameActions";

import prayerMutations from "./prayerMutations";
import prayerActions from "./prayerActions";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    name: "Pete's Toolkit Store",
    counters: [],
    todos: [],
    timers: [],
    prayers: [],
  },
  mutations: {
    ...prayerMutations,
    ...todoMutations,
    ...counterMutations,
    ...timerMutations,
    ...appNameMutations,
  },
  actions: {
    ...prayerActions,
    ...todoActions,
    ...counterActions,
    ...appNameActions,
  },
});

export default store;
