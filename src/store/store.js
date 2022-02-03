import Vue from "vue";
import Vuex from "vuex";

// import { v4 as uuid } from "uuid";

import toastMutations from "./toastMutations";
import toastActions from "./toastActions";

import counterMutations from "./counterMutations";
import counterActions from "./counterActions";

import todoMutations from "./todoMutations";
import todoActions from "./todoActions";

import timerMutations from "./timerMutations";

import appNameMutations from "./appNameMutations";
import appNameActions from "./appNameActions";

import prayerMutations from "./prayerMutations";
import prayerActions from "./prayerActions";

import readingMutations from "./readingMutations";
import readingActions from "./readingActions";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    name: "Pete's Toolkit Store",
    toasts: [],
    counters: [],
    todos: [],
    timers: [],
    prayers: [],
    reading: [],
  },
  mutations: {
    ...appNameMutations,
    ...toastMutations,
    ...prayerMutations,
    ...readingMutations,
    ...todoMutations,
    ...counterMutations,
    ...timerMutations,
  },
  actions: {
    ...toastActions,
    ...prayerActions,
    ...readingActions,
    ...todoActions,
    ...counterActions,
    ...appNameActions,
  },
});

export default store;
