import { v4 as uuid } from "uuid"

export const namespaced = true

// ================================================================

export const state = () => ({
  timers: [],
})

// ================================================================

export const mutations = {
  ADD_TIMER(state) {
    state.timers.push({
      id: uuid(),
      timerName: "New Timer",
      time: 0,
      interval: null,
      dateCreated: new Date(),
    })
  },
  REMOVE_TIMER(state, id) {
    state.timers = state.timers.filter((t) => t.id !== id)
  },
  INCREMENT_TIME(state, id) {
    state.timers = state.timers.map((t) => {
      if (t.id === id) {
        return {
          ...t,
          time: t.time + 1,
        }
      } else {
        return t
      }
    })
  },
  START_TIMER(state, id) {
    state.timers = state.timers.map((t) => {
      if (t.id === id) {
        return {
          ...t,
          interval: setInterval(() => {
            this.commit("timers/INCREMENT_TIME", id)
          }, 1000),
        }
      } else {
        return t
      }
    })
  },
  STOP_TIMER(state, id) {
    state.timers = state.timers.map((t) => {
      if (t.id === id) {
        clearInterval(t.interval)
        return {
          ...t,
          interval: null,
        }
      } else {
        return t
      }
    })
  },
  RESET_TIMER(state, id) {
    state.timers = state.timers.map((t) => {
      if (t.id === id) {
        clearInterval(t.interval)
        return {
          ...t,
          interval: null,
          time: 0,
        }
      } else {
        return t
      }
    })
  },
  SET_TIMER_NAME(state, { id, name }) {
    state.timers = state.timers.map((t) => {
      if (t.id === id) {
        return {
          ...t,
          timerName: name,
        }
      } else {
        return t
      }
    })
  },
}
