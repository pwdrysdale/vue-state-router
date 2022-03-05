import { v4 as uuid } from "uuid"

export const namespaced = true

export const state = {
  items: [],
  categories: [],
  filteredItems: [],
  sortFilterCriteria: {
    sortBy: "Category",
    sortOrder: "Ascending",
    hidePurchased: true,
  },
}

export const mutations = {
  SET_SF_LIST(state) {
    state.filteredItems = state.items
      .filter((item) => {
        if (state.sortFilterCriteria.hidePurchased) {
          return !item.purchased
        } else {
          return item
        }
      })
      .sort((a, b) => sortItems(a, b, state))
  },

  SET_ITEMS(state, items) {
    state.items = items
  },

  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },

  ADD_ITEM(state, item) {
    state.items.push(item)
  },

  ADD_CATEGORY(state, category) {
    state.categories.push(category)
  },

  REMOVE_ITEM(state, id) {
    state.items = state.items.filter((item) => item.id !== id)
  },

  REMOVE_CATEGORY(state, id) {
    state.categories = state.categories.filter((category) => category.id !== id)
    state.items = state.items.map((item) =>
      item.categoryId === id
        ? { ...item, category: null, dateModified: new Date() }
        : item
    )
  },

  SET_ITEM_PURCHASED(state, id) {
    const item = state.items.find((item) => item.id === id)
    item.purchased = !item.purchased
    item.dateModified = new Date()
  },

  UPDATE_ITEM_QUANTITY(state, { id, quantity }) {
    const item = state.items.find((item) => item.id === id)
    item.quantity = quantity
    item.dateModified = new Date()
  },

  UPDATE_ITEM_CATEGORY(state, { id, categoryId }) {
    const item = state.items.find((item) => item.id === id)
    item.categoryId = categoryId
    item.dateModified = new Date()
  },

  UPDATE_ITEM_NAME(state, { id, name }) {
    const item = state.items.find((item) => item.id === id)
    item.name = name
  },

  UPDATE_CATEGORY_NAME(state, { id, name }) {
    const category = state.categories.find((category) => category.id === id)
    category.name = name
    category.dateModified = new Date()
  },

  UPDATE_CATEGORY_SORT_ORDER(state, { id, sortOrder }) {
    const category = state.categories.find((category) => category.id === id)
    category.sortOrder = sortOrder
    category.dateModified = new Date()
  },

  CLEAR_PURCHASED(state) {
    state.items = state.items.filter((item) => !item.purchased)
  },

  TOGGLE_CATEGORY_VISIBILITY(state, id) {
    const category = state.categories.find((category) => category.id === id)
    category.visible = !category.visible
    category.daateModified = new Date()
  },

  TOGGLE_SORT_ORDER(state) {
    state.sortFilterCriteria.sortOrder =
      state.sortFilterCriteria.sortOrder === "Ascending"
        ? "Descending"
        : "Ascending"
  },

  TOGGLE_HIDE_PURCHASED(state) {
    state.sortFilterCriteria.hidePurchased =
      !state.sortFilterCriteria.hidePurchased
  },

  SET_FILTER_CRITERIA(state) {
    const options = [
      "Category",
      "Name",
      "Quantity",
      "Created Date",
      "Date Modified",
    ]

    const current = state.sortFilterCriteria.sortBy
    const index = options.indexOf(current)
    const next = options[(index + 1) % options.length]

    state.sortFilterCriteria.sortBy = next
  },

  SET_SORT_FILTER_CRITERIA(state, criteria) {
    state.sortFilterCriteria = criteria
  },
}

export const actions = {
  setShoppingInStorage(state) {
    localStorage.setItem("shoppingList", JSON.stringify(state.state))
  },

  loadShoppingFromStorage(state) {
    if (!localStorage.getItem("shoppingList")) return

    const { items, categories, sortFilterCriteria } = JSON.parse(
      localStorage.getItem("shoppingList")
    )

    if (items) {
      state.commit("SET_ITEMS", items)
    }
    if (categories) {
      state.commit("SET_CATEGORIES", categories)
    }

    if (sortFilterCriteria) {
      state.commit("SET_SORT_FILTER_CRITERIA", sortFilterCriteria)
    }
    state.dispatch("setSFList")
  },

  addItem({ commit, dispatch }, item) {
    const newItem = {
      id: uuid(),
      purchased: false,
      dateAdded: new Date(),
      dateModified: new Date(),
      ...item,
    }
    commit("ADD_ITEM", newItem)
    dispatch("setSFList")
    dispatch("setShoppingInStorage")
  },

  addCategory({ commit, dispatch }, category) {
    const newCategory = {
      id: uuid(),
      dateAdded: new Date(),
      dateModified: new Date(),
      ...category,
    }
    commit("ADD_CATEGORY", newCategory)
    dispatch("setShoppingInStorage")
  },

  togglePurchased({ commit, dispatch }, id) {
    commit("SET_ITEM_PURCHASED", id)
    dispatch("setSFList")
    dispatch("setShoppingInStorage")
  },

  updateItemQuantity({ commit, dispatch }, { id, quantity }) {
    commit("UPDATE_ITEM_QUANTITY", { id, quantity })
    dispatch("setSFList")
    dispatch("setShoppingInStorage")
  },

  updateItemCategory({ commit, dispatch }, { id, categoryId }) {
    commit("UPDATE_ITEM_CATEGORY", { id, categoryId })
    dispatch("setSFList")
    dispatch("setShoppingInStorage")
  },

  updateItemName({ commit, dispatch }, { id, name }) {
    commit("UPDATE_ITEM_NAME", { id, name })
    dispatch("setSFList")
    dispatch("setShoppingInStorage")
  },

  updateCategoryName({ commit, dispatch }, { id, name }) {
    commit("UPDATE_CATEGORY_NAME", { id, name })
    dispatch("setSFList")
    dispatch("setShoppingInStorage")
  },

  updateCategorySortOrder({ commit, dispatch }, { id, sortOrder }) {
    commit("UPDATE_CATEGORY_SORT_ORDER", { id, sortOrder })
    dispatch("setSFList")
    dispatch("setShoppingInStorage")
  },

  removeItem({ commit, dispatch }, id) {
    commit("REMOVE_ITEM", id)
    dispatch("setSFList")
    dispatch("setShoppingInStorage")
  },

  removeCategory({ commit, dispatch }, id) {
    commit("REMOVE_CATEGORY", id)
    dispatch("setSFList")
    dispatch("setShoppingInStorage")
  },

  clearPurchased({ commit, dispatch }) {
    commit("CLEAR_PURCHASED")
    dispatch("setSFList")
    dispatch("setShoppingInStorage")
  },

  toggleCategoryVisibility({ commit, dispatch }, id) {
    commit("TOGGLE_CATEGORY_VISIBILITY", id)
    dispatch("setSFList")
    dispatch("setShoppingInStorage")
  },

  setItemCategory({ commit, dispatch }, { id, categoryId }) {
    commit("UPDATE_ITEM_CATEGORY", { id, categoryId })
    dispatch("setSFList")
    dispatch("setShoppingInStorage")
  },

  clearAllItems({ commit, dispatch }) {
    commit("SET_ITEMS", [])
    dispatch("setSFList")
    dispatch("setShoppingInStorage")
  },

  toggleSortOrder({ commit, dispatch }) {
    commit("TOGGLE_SORT_ORDER")
    dispatch("setSFList")
    dispatch("setShoppingInStorage")
  },

  toggleHidePurchased({ commit, dispatch }) {
    commit("TOGGLE_HIDE_PURCHASED")
    dispatch("setShoppingInStorage")
    dispatch("setSFList")
  },

  setFilterCriteria({ commit, dispatch }) {
    commit("SET_FILTER_CRITERIA")
    dispatch("setShoppingInStorage")
    dispatch("setSFList")
  },

  setSFList({ commit }) {
    commit("SET_SF_LIST")
  },
}

const sortItems = (a, b, state) => {
  const { sortOrder, sortBy } = state.sortFilterCriteria

  if (sortBy === "Category") {
    const aCategory = state.categories.find(
      (category) => category.id === a.categoryId
    ).sortOrder
    const bCategory = state.categories.find(
      (category) => category.id === b.categoryId
    ).sortOrder

    if (sortOrder === "Ascending") {
      return aCategory >= bCategory ? 1 : -1
    } else {
      return aCategory < bCategory ? 1 : -1
    }
  }

  if (sortBy === "Name") {
    if (sortOrder === "Ascending") {
      return a.name.toLowerCase() >= b.name.toLowerCase() ? 1 : -1
    } else {
      return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
    }
  }

  if (sortBy === "Quantity") {
    if (sortOrder === "Ascending") {
      return a.quantity >= b.quantity ? 1 : -1
    } else {
      return a.quantity < b.quantity ? 1 : -1
    }
  }

  if (sortBy === "Created Date") {
    if (sortOrder === "Ascending") {
      return a.dateAdded >= b.dateAdded ? 1 : -1
    } else {
      return a.dateAdded < b.dateAdded ? 1 : -1
    }
  }

  if (sortBy === "Modified Date") {
    if (sortOrder === "Ascending") {
      return a.dateModified >= b.dateModified ? 1 : -1
    } else {
      return a.dateModified < b.dateModified ? 1 : -1
    }
  }

  if (sortBy === "Purchased") {
    if (sortOrder === "Ascending") {
      return a.purchased >= b.purchased ? 1 : -1
    } else {
      return a.purchased < b.purchased ? 1 : -1
    }
  }

  return 0
}
