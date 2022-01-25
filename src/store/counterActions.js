export default {
  setInLocalStorage(context) {
    localStorage.setItem("vuecounters", JSON.stringify(context.state.counters));
  },

  getCountersFromLocalStorage(context) {
    const counters = localStorage.getItem("vuecounters")
      ? JSON.parse(localStorage.getItem("vuecounters"))
      : [];
    context.commit("loadCounters", counters);
  },

  addCounter(context) {
    context.commit("addCounter");
    context.dispatch("setInLocalStorage");
  },

  incrementCounter(context, id) {
    context.commit("incrementCounter", id);
    context.dispatch("setInLocalStorage");
  },

  decrementCounter(context, id) {
    context.commit("decrementCounter", id);
    context.dispatch("setInLocalStorage");
  },

  resetCounter(context, id) {
    context.commit("resetCounter", id);
    context.dispatch("setInLocalStorage");
  },

  setCounterIncrement(context, payload) {
    context.commit("setCounterIncrement", payload);
    context.dispatch("setInLocalStorage");
  },

  setCounterName(context, payload) {
    context.commit("setCounterName", payload);
    context.dispatch("setInLocalStorage");
  },

  setCounterCount(context, payload) {
    context.commit("setCounterCount", payload);
    context.dispatch("setInLocalStorage");
  },

  removeCounter(context, id) {
    context.commit("removeCounter", id);
    context.dispatch("setInLocalStorage");
  },
};
