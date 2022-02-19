import { v4 as uuid } from "uuid"

export const namespaced = true

export const state = {
  prayers: [],
}

export const mutations = {
  LOAD_PRAYERS(state, prayers) {
    state.prayers = prayers || []
  },

  ADD_PRAYER(state, prayer) {
    state.prayers = [...state.prayers, prayer]
  },

  REMOVE_PRAYER(state, id) {
    state.prayers = state.prayers.filter((p) => p.id !== id)
  },

  SET_PRAYER_NAME(state, { id, name }) {
    state.prayers = state.prayers.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          prayerName: name,
        }
      } else {
        return p
      }
    })
  },

  SET_PRAYER_TEXT(state, { id, text }) {
    state.prayers = state.prayers.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          prayerText: text,
        }
      } else {
        return p
      }
    })
  },

  ADD_PRAYER_DATE(state, id) {
    state.prayers = state.prayers.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          prayedDates: [...p.prayedDates, new Date()],
        }
      } else {
        return p
      }
    })
  },

  MARK_AS_ANSWERED(state, id) {
    state.prayers = state.prayers.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          answered: !p.answered,
        }
      } else {
        return p
      }
    })
  },
}

export const actions = {
  setPrayersInLocal(context) {
    localStorage.setItem("vueprayers", JSON.stringify(context.state.prayers))
  },

  getPrayersFromLocal({ commit }) {
    const prayers = localStorage.getItem("vueprayers")
    if (prayers) {
      const correctDates = JSON.parse(prayers).map((p) => {
        return {
          ...p,
          prayedDates: p.prayedDates.map((pd) => new Date(pd)),
          createdDate: new Date(p.createdDate),
        }
      })
      commit("LOAD_PRAYERS", correctDates)
    } else {
      const prayers = [
        {
          id: uuid(),
          prayerName: "",
          prayerText: "",
          createdDate: new Date(),
          prayedDates: [],
          answered: false,
        },
      ]
      commit("LOAD_PRAYERS", prayers)
    }
  },

  addPrayer({ dispatch, commit }) {
    const prayer = {
      id: uuid(),
      prayerName: "",
      prayerText: "",
      createdDate: new Date(),
      prayedDates: [],
    }
    commit("ADD_PRAYER", prayer)
    dispatch(
      "toasts/addToasts",
      {
        text: ["Added!", "Keep at it!", "Pray unceasingly."][
          Math.floor(Math.random() * 3)
        ],
        type: "success",
      },
      { root: true }
    )
    dispatch("setPrayersInLocal")
  },

  removePrayer({ dispatch, commit }, id) {
    dispatch(
      "toasts/addToasts",
      {
        text: ["Gone!", "Done!"][Math.floor(Math.random() * 2)],
        type: "success",
      },
      { root: true }
    )
    commit("REMOVE_PRAYER", id)
    dispatch("setPrayersInLocal")
  },

  setPrayerName({ dispatch, commit }, payload) {
    commit("SET_PRAYER_NAME", payload)
    dispatch("setPrayersInLocal")
  },

  setPrayerText({ dispatch, commit }, payload) {
    commit("SET_PRAYER_TEXT", payload)
    dispatch("setPrayersInLocal")
  },

  addPrayerDate({ dispatch, commit }, id) {
    commit("ADD_PRAYER_DATE", id)
    dispatch(
      "toasts/addToasts",
      {
        text: ["Noted!", "Roger that!", "He is faithful!"][
          Math.floor(Math.random() * 3)
        ],
        type: "success",
      },
      { root: true }
    )
    dispatch("setPrayersInLocal")
  },

  setPrayerAnswered({ dispatch, commit, state }, id) {
    const prayer = state.prayers.find((p) => p.id === id)
    if (!prayer.answered) {
      dispatch(
        "toasts/addToasts",
        {
          text: ["Let us be glad!", "Praise the Lord!", "How good is it?"][
            Math.floor(Math.random() * 3)
          ],
          type: "success",
        },
        { root: true }
      )
    }
    commit("MARK_AS_ANSWERED", id)
    dispatch("setPrayersInLocal")
  },
}
