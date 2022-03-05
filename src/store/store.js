import Vue from "vue"
import Vuex from "vuex"

// import toastMutations from "./toastMutations"
// import toastActions from "./toastActions"

// import todoMutations from "./todoMutations"
// import todoActions from "./todoActions"

// import timerMutations from "./timerMutations"

// import readingMutations from "./readingMutations";
// import readingActions from "./readingActions";

import * as weatherPrefs from "./modules/weatherPrefs"
import * as appName from "./modules/appName"
import * as counters from "./modules/counters"
import * as prayers from "./modules/prayers"
import * as readings from "./modules/readings"
import * as todos from "./modules/todos"
import * as shoppingList from "./modules/shoppingList"
import * as timers from "./modules/timers"
import * as toasts from "./modules/toasts"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    weatherPrefs,
    appName,
    counters,
    prayers,
    readings,
    todos,
    shoppingList,
    timers,
    toasts,
  },
})

export default store
