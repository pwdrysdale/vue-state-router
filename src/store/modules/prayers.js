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
  sfPrayers: [],
}

export const mutations = {
  LOAD_PRAYERS(state, payload) {
    state.prayers = payload.prayers || []
    state.categories = payload.categories || []
    state.sortHideOptions = payload.sortHideOptions || {
      sortOrder: "Descending",
      sortCategory: "Created Date",
      hideAnswered: false,
    }
  },

  SET_SF_PRAYERS(state, sortRandom = true) {
    state.sfPrayers = state.prayers
      .sort((a, b) => sortPrayers(a, b, state, sortRandom))
      .filter(
        (prayer) => !(prayer.answered && state.sortHideOptions.hideAnswered)
      )
      .filter((prayer) => {
        const hiddenCategoryIds = state.categories
          .filter((category) => !category.visible)
          .map((category) => category.id)
        return !hiddenCategoryIds.includes(prayer.categoryId)
      })
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

  getPrayersFromLocal({ commit, dispatch }) {
    const loaded = localStorage.getItem("vueprayers")
    if (loaded && JSON.parse(loaded).prayers) {
      const { prayers, categories, sortHideOptions } = JSON.parse(loaded)
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
        sortHideOptions: sortHideOptions || {
          sortOrder: "Descending",
          hideAnswered: false,
          sortCategory: "Created Date",
        },
      })
      dispatch("setSFPrayers")
    } else if (JSON.parse(loaded) instanceof Array) {
      commit("LOAD_PRAYERS", {
        prayers: loaded,
        categories: [],
        sortHideOptions: {},
      })
      dispatch("setSFPrayers")
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
      dispatch("setSFPrayers")
    }
  },

  addPrayer({ dispatch, commit }, payload = {}) {
    const prayer = {
      id: uuid(),
      prayerName: payload.prayerName || "",
      prayerText: payload.prayerText || "",
      createdDate: new Date(),
      prayedDates: [],
      categoryId: payload.categoryId || "",
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
    dispatch("setSFPrayers")
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
    dispatch("setSFPrayers")
  },

  setPrayerName({ dispatch, commit, state }, payload) {
    commit("SET_PRAYER_NAME", payload)
    dispatch("setPrayersInLocal")
    // dispatch("setSFPrayers")
    if (state.sortHideOptions.sortCategory !== "Random") {
      dispatch("setSFPrayers")
    } else {
      dispatch("setSFPrayers", false)
    }
  },

  setPrayerText({ dispatch, commit }, payload) {
    commit("SET_PRAYER_TEXT", payload)
    dispatch("setPrayersInLocal")
    // dispatch("setSFPrayers")
    if (state.sortHideOptions.sortCategory !== "Random") {
      dispatch("setSFPrayers")
    } else {
      dispatch("setSFPrayers", false)
    }
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
    if (state.sortHideOptions.sortCategory !== "Random") {
      dispatch("setSFPrayers")
    } else {
      dispatch("setSFPrayers", false)
    }
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
    if (state.sortHideOptions.sortCategory !== "Random") {
      dispatch("setSFPrayers")
    } else {
      dispatch("setSFPrayers", false)
    }
  },

  setPrayerCategory({ dispatch, commit }, payload) {
    commit("SET_PRAYER_CATEGORY", payload)
    dispatch("setPrayersInLocal")
    if (state.sortHideOptions.sortCategory !== "Random") {
      dispatch("setSFPrayers")
    } else {
      dispatch("setSFPrayers", false)
    }
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
    dispatch("setSFPrayers")
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
    dispatch("setSFPrayers")
  },

  setCategoryName({ dispatch, commit }, payload) {
    commit("SET_CATEGORY_NAME", payload)
    dispatch("setPrayersInLocal")
    // if (state.sortHideOptions.sortCategory === "Category") {
    //   dispatch("setSFPrayers")
    // }
  },

  setSortOrder({ dispatch, commit }, payload) {
    commit("SET_CATEGORY_ORDER", payload)
    dispatch("setPrayersInLocal")
    dispatch("setSFPrayers")
  },

  setCategoryColour({ dispatch, commit }, payload) {
    commit("SET_CATEGORY_COLOUR", payload)
    dispatch("setPrayersInLocal")
    dispatch("setSFPrayers")
  },

  toggleCategoryVisibility({ dispatch, commit }, payload) {
    commit("TOGGLE_CATEGORY_VISIBILITY", payload)
    dispatch("setPrayersInLocal")
    dispatch("setSFPrayers")
  },

  setSortCategory({ dispatch, commit }, payload) {
    commit("SET_SORT_CATEGORY", payload)
    dispatch("setPrayersInLocal")
    dispatch("setSFPrayers")
  },

  setPrayerSortOrder({ dispatch, commit }, payload) {
    commit("TOGGLE_SORT_ORDER", payload)
    dispatch("setPrayersInLocal")
    dispatch("setSFPrayers")
  },

  toggleShowAnswered({ dispatch, commit }, payload) {
    commit("TOGGLE_HIDE_ANSWERED", payload)
    dispatch("setPrayersInLocal")
    dispatch("setSFPrayers")
  },

  setSFPrayers(store, sortRandom = true) {
    store.commit("SET_SF_PRAYERS", sortRandom)
  },
}

const sortPrayers = (a, b, state, sortRandom = true) => {
  const { sortOrder, sortCategory } = state.sortHideOptions

  if (sortRandom && sortCategory === "Random") {
    return Math.random() - 0.5
  }
  if (sortCategory === "Created Date") {
    return sortOrder === "Ascending"
      ? a.createdDate - b.createdDate
      : b.createdDate - a.createdDate
  } else if (sortCategory === "Last Prayed") {
    return sortOrder === "Ascending"
      ? a.prayedDates.length === 0
        ? -1
        : a.prayedDates[a.prayedDates.length - 1] -
          b.prayedDates[b.prayedDates.length - 1]
      : b.prayedDates[b.prayedDates.length - 1] -
          a.prayedDates[a.prayedDates.length - 1]
  } else if (sortCategory === "Prayed Count") {
    return sortOrder === "Ascending"
      ? a.prayedDates.length - b.prayedDates.length > 0
        ? 1
        : -1
      : b.prayedDates.length - a.prayedDates.length > 0
      ? 1
      : -1
  } else if (sortCategory === "Title") {
    return sortOrder === "Ascending"
      ? a.prayerName.toLowerCase() > b.prayerName.toLowerCase()
        ? 1
        : -1
      : b.prayerName.toLowerCase() > a.prayerName.toLowerCase()
      ? 1
      : -1
  } else if (sortCategory === "Body") {
    return sortOrder === "Ascending"
      ? a.prayerText.toLowerCase() > b.prayerText.toLowerCase()
        ? 1
        : -1
      : b.prayerText.toLowerCase() > a.prayerText.toLowerCase()
      ? 1
      : -1
  } else if (sortCategory === "Category") {
    let aWeight = 0
    let bWeight = 0
    aWeight =
      state.categories.find((c) => c.id === a.categoryId)?.sortOrder || 0
    bWeight =
      state.categories.find((c) => c.id === b.categoryId)?.sortOrder || 0
    return sortOrder === "Ascending" ? aWeight - bWeight : bWeight - aWeight
  } else if (sortCategory === "Answered") {
    return sortOrder === "Ascending"
      ? a.answered === true
        ? 1
        : -1
      : b.answered === true
      ? 1
      : -1
  }
}
