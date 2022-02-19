import { v4 as uuid } from "uuid"

export const namespaced = true

// whilst there is just one array here we could pass it as that

// export const state = []

export const state = {
  counters: [],
}

export const mutations = {
  LOAD_COUNTERS(state, counters) {
    state.counters = counters
  },

  ADD_COUNTER(state) {
    state.counters = [
      ...state.counters,
      {
        id: uuid(),
        name: "New Counter",
        count: 0,
        increment: 1,
        dateCreated: new Date(),
      },
    ]
  },
  INCREMENT_COUNTER(state, id) {
    state.counters = state.counters.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          count: c.count + c.increment,
        }
      } else {
        return c
      }
    })
  },
  DECREMENT_COUNTER(state, id) {
    state.counters = state.counters.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          count: c.count - c.increment,
        }
      } else {
        return c
      }
    })
  },
  RESET_COUNTER(state, id) {
    state.counters = state.counters.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          count: 0,
          increment: 1,
        }
      } else {
        return c
      }
    })
  },
  SET_COUNTER_INCREMENT(state, { id, increment }) {
    state.counters = state.counters.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          increment,
        }
      } else {
        return c
      }
    })
  },
  SET_COUNTER_NAME(state, { id, name }) {
    state.counters = state.counters.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          name,
        }
      } else {
        return c
      }
    })
  },
  SET_COUNTER_COUNT(state, { id, count }) {
    state.counters = state.counters.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          count,
        }
      } else {
        return c
      }
    })
  },
  REMOVE_COUNTER(state, id) {
    state.counters = state.counters.filter((c) => c.id !== id)
  },
}

export const actions = {
  setInLocalStorage(context) {
    localStorage.setItem("vuecounters", JSON.stringify(context.state.counters))
  },

  getCountersFromLocalStorage({ commit }) {
    const counters = localStorage.getItem("vuecounters")
      ? JSON.parse(localStorage.getItem("vuecounters"))
      : []
    commit("LOAD_COUNTERS", counters)
  },

  addCounter({ dispatch, commit }) {
    commit("ADD_COUNTER")
    dispatch(
      "toasts/addToasts",
      {
        text: "More, more, more!",
        type: "success",
      },
      { root: true }
    )
    dispatch("setInLocalStorage")
  },

  incrementCounter({ dispatch, commit }, id) {
    commit("INCREMENT_COUNTER", id)
    dispatch("setInLocalStorage")
  },

  decrementCounter({ dispatch, commit }, id) {
    commit("DECREMENT_COUNTER", id)
    dispatch("setInLocalStorage")
  },

  resetCounter({ dispatch, commit }, id) {
    commit("RESET_COUNTER", id)
    dispatch(
      "toasts/addToasts",
      {
        text: ["Reset!", "You're back to zero!", "Back to square one I guess!"][
          Math.floor(Math.random() * 3)
        ],
        type: "success",
      },
      { root: true }
    )
    dispatch("setInLocalStorage")
  },

  setCounterIncrement({ dispatch, commit }, payload) {
    commit("SET_COUNTER_INCREMENT", payload)
    dispatch(
      "toasts/addToasts",
      {
        text: ["Changed!", "Roger that!", "Mmmmmm. Good idea."][
          Math.floor(Math.random() * 3)
        ],
        type: "success",
      },
      { root: true }
    )
    dispatch("setInLocalStorage")
  },

  setCounterName({ dispatch, commit }, payload) {
    commit("SET_COUNTER_NAME", payload)
    dispatch("setInLocalStorage")
  },

  setCounterCount({ dispatch, commit }, payload) {
    commit("SET_COUNTER_COUNT", payload)
    dispatch("setInLocalStorage")
  },

  removeCounter({ dispatch, commit }, id) {
    commit("REMOVE_COUNTER", id)
    dispatch(
      "toasts/addToasts",
      {
        text: ["Gooone!", "Thats that!", "Bye!"][Math.floor(Math.random() * 3)],
        type: "success",
      },
      { root: true }
    )
    dispatch("setInLocalStorage")
  },
}
