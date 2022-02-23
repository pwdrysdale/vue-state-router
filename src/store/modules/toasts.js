import { v4 as uuid } from "uuid"

export const namespaced = true

// ================================================================

export const state = () => ({
  toasts: [],
})

// ================================================================

export const actions = {
  addToasts({ commit }, { text, type }) {
    const toast = {
      id: uuid(),
      text,
      type,
    }

    // dispatch addToasts mutation
    commit("addToasts", toast)

    // set timeout to remove toast
    setTimeout(() => {
      commit("removeToasts", toast.id)
    }, 5000)
  },
}

// ================================================================

export const mutations = {
  addToasts(state, toast) {
    // add toast to store
    state.toasts.push(toast)
  },
  removeToasts(state, id) {
    // remove toast from store
    state.toasts = state.toasts.filter((t) => t.id !== id)
  },
}

export const getters = {}
