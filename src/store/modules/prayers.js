import { v4 as uuid } from "uuid"

export const namespaced = true

export const state = {
  prayers: [],
  categories: [],
  sortHideOptions: {
    sortOrder: "Descending",
    sortCategory: "Created Date",
    hideAnswered: false,
  },
}

export const mutations = {
  LOAD_PRAYERS(state, payload) {
    state.prayers = payload.prayers || []
    state.categories = payload.categories || []
    state.showHideOptions = payload.showHideOptions || {}
  },

  ADD_PRAYER(state, prayer) {
    state.prayers = [...state.prayers, prayer]
  },

  ADD_CATEGORY(state, category) {
    state.categories = [...state.categories, category]
  },

  REMOVE_PRAYER(state, id) {
    state.prayers = state.prayers.filter((p) => p.id !== id)
  },

  REMOVE_CATEGORY(state, id) {
    state.categories = state.categories.filter((c) => c.id !== id)
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

  SET_CATEGORY_NAME(state, { id, name }) {
    state.categories = state.categories.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          categoryName: name,
        }
      } else {
        return c
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

  SET_PRAYER_CATEGORY(state, { id, categoryId }) {
    state.prayers = state.prayers.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          categoryId: categoryId,
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

  SET_CATEGORY_ORDER(state, { id, order }) {
    state.categories = state.categories.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          sortOrder: order,
        }
      } else {
        return c
      }
    })
  },

  SET_CATEGORY_COLOUR(state, { id, colour }) {
    state.categories = state.categories.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          colour,
        }
      } else {
        return c
      }
    })
  },

  TOGGLE_CATEGORY_VISIBILITY(state, { id }) {
    console.log("Mutation", id)
    state.categories = state.categories.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          visible: !c.visible,
        }
      } else {
        return c
      }
    })
  },

  TOGGLE_SORT_ORDER(state) {
    state.sortHideOptions.sortOrder =
      state.sortHideOptions.sortOrder === "Descending"
        ? "Ascending"
        : "Descending"
  },

  TOGGLE_HIDE_ANSWERED(state) {
    state.sortHideOptions.hideAnswered = !state.sortHideOptions.hideAnswered
  },

  SET_SORT_CATEGORY(state) {
    const options = [
      "Created Date",
      "Last Prayed",
      "Prayed Count",
      "Title",
      "Body",
      "Answered",
      "Category",
      "Random",
    ]
    const index = options.indexOf(state.sortHideOptions.sortCategory)
    const nextIndex = (index + 1) % options.length
    state.sortHideOptions.sortCategory = options[nextIndex]
  },
}

export const actions = {
  setPrayersInLocal(context) {
    localStorage.setItem("vueprayers", JSON.stringify(context.state))
  },

  getPrayersFromLocal({ commit }) {
    const loaded = localStorage.getItem("vueprayers")
    if (loaded) {
      const { prayers, categories, showHideOptions } = JSON.parse(loaded)
      const correctDates = prayers.map((p) => {
        return {
          ...p,
          prayedDates: p.prayedDates.map((pd) => new Date(pd)),
          createdDate: new Date(p.createdDate),
        }
      })
      commit("LOAD_PRAYERS", {
        prayers: correctDates,
        categories: categories || [],
        showHideOptions: showHideOptions || {},
      })
    } else {
      const prayers = [
        {
          id: uuid(),
          prayerName: "",
          prayerText: "",
          createdDate: new Date(),
          prayedDates: [],
          answered: false,
          categoryId: "",
        },
      ]
      commit("LOAD_PRAYERS", { prayers, categories: [] })
    }
  },

  addPrayer({ dispatch, commit }) {
    const prayer = {
      id: uuid(),
      prayerName: "",
      prayerText: "",
      createdDate: new Date(),
      prayedDates: [],
      categoryId: "",
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

  setPrayerCategory({ dispatch, commit }, payload) {
    commit("SET_PRAYER_CATEGORY", payload)
    dispatch("setPrayersInLocal")
  },

  addCategory({ dispatch, commit }) {
    const category = {
      id: uuid(),
      categoryName: "",
      sortOrder: 0,
      colour: "",
      visible: true,
    }
    commit("ADD_CATEGORY", category)
    dispatch("setPrayersInLocal")
  },

  removeCategory({ dispatch, commit }, id) {
    dispatch(
      "toasts/addToasts",
      {
        text: ["Gone!", "Done!"][Math.floor(Math.random() * 2)],
        type: "success",
      },
      { root: true }
    )
    commit("REMOVE_CATEGORY", id)
    dispatch("setPrayersInLocal")
  },

  setCategoryName({ dispatch, commit }, payload) {
    commit("SET_CATEGORY_NAME", payload)
    dispatch("setPrayersInLocal")
  },

  setSortOrder({ dispatch, commit }, payload) {
    commit("SET_CATEGORY_ORDER", payload)
    dispatch("setPrayersInLocal")
  },

  setCategoryColour({ dispatch, commit }, payload) {
    commit("SET_CATEGORY_COLOUR", payload)
    dispatch("setPrayersInLocal")
  },

  toggleCategoryVisibility({ dispatch, commit }, payload) {
    console.log("Action", payload)
    commit("TOGGLE_CATEGORY_VISIBILITY", payload)
    dispatch("setPrayersInLocal")
  },

  setSortCategory({ dispatch, commit }, payload) {
    commit("SET_SORT_CATEGORY", payload)
    dispatch("setPrayersInLocal")
  },

  setPrayerSortOrder({ dispatch, commit }, payload) {
    commit("SET_SORT_ORDER", payload)
    dispatch("setPrayersInLocal")
  },

  toggleShowAnswered({ dispatch, commit }, payload) {
    commit("TOGGLE_SHOW_ANSWERED", payload)
    dispatch("setPrayersInLocal")
  },
}
