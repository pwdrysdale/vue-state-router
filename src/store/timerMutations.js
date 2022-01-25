import { v4 as uuid } from "uuid";

export default {
  addTimer(state) {
    state.timers.push({
      id: uuid(),
      timerName: "New Timer",
      time: 0,
      interval: null,
    });
  },
  removeTimer(state, id) {
    state.timers = state.timers.filter((t) => t.id !== id);
  },
  incrementTime(state, id) {
    state.timers = state.timers.map((t) => {
      if (t.id === id) {
        return {
          ...t,
          time: t.time + 1,
        };
      } else {
        return t;
      }
    });
  },
  startTimer(state, id) {
    state.timers = state.timers.map((t) => {
      if (t.id === id) {
        return {
          ...t,
          interval: setInterval(() => {
            this.commit("incrementTime", id);
          }, 1000),
        };
      } else {
        return t;
      }
    });
  },
  stopTimer(state, id) {
    state.timers = state.timers.map((t) => {
      if (t.id === id) {
        clearInterval(t.interval);
        return {
          ...t,
          interval: null,
        };
      } else {
        return t;
      }
    });
  },
  resetTimer(state, id) {
    state.timers = state.timers.map((t) => {
      if (t.id === id) {
        clearInterval(t.interval);
        return {
          ...t,
          interval: null,
          time: 0,
        };
      } else {
        return t;
      }
    });
  },
  setTimerName(state, { id, name }) {
    state.timers = state.timers.map((t) => {
      if (t.id === id) {
        return {
          ...t,
          timerName: name,
        };
      } else {
        return t;
      }
    });
  },
};
