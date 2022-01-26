import { v4 as uuid } from "uuid";

export default {
  // mutation that can be used to manipulate state

  loadCounters(state, counters) {
    state.counters = counters;
  },

  addCounter(state) {
    state.counters.push({
      id: uuid(),
      name: "New Counter",
      count: 0,
      increment: 1,
      dateCreated: new Date(),
    });
  },
  incrementCounter(state, id) {
    state.counters = state.counters.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          count: c.count + c.increment,
        };
      } else {
        return c;
      }
    });
  },
  decrementCounter(state, id) {
    state.counters = state.counters.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          count: c.count - c.increment,
        };
      } else {
        return c;
      }
    });
  },
  resetCounter(state, id) {
    state.counters = state.counters.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          count: 0,
          increment: 1,
        };
      } else {
        return c;
      }
    });
  },
  setCounterIncrement(state, { id, increment }) {
    state.counters = state.counters.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          increment,
        };
      } else {
        return c;
      }
    });
  },
  setCounterName(state, { id, name }) {
    state.counters = state.counters.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          name,
        };
      } else {
        return c;
      }
    });
  },
  setCounterCount(state, { id, count }) {
    state.counters = state.counters.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          count,
        };
      } else {
        return c;
      }
    });
  },
  removeCounter(state, id) {
    state.counters = state.counters.filter((c) => c.id !== id);
  },
};
