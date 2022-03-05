import { v4 as uuid } from "uuid"

export const namespaced = true

export const state = {
  items: [],
  categories: [],
}

export const mutations = {
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

  CLEAR_PURCHASED(state) {
    state.items = state.items.filter((item) => !item.purchased)
  },

  TOGGLE_CATEGORY_VISIBILITY(state, id) {
    const category = state.categories.find((category) => category.id === id)
    category.visible = !category.visible
    category.daateModified = new Date()
  },
}

export const actions = {
  setShoppingInStorage(state) {
    localStorage.setItem("shoppingList", JSON.stringify(state.state))
  },

  loadShoppingFromStorage(state) {
    if (!localStorage.getItem("shoppingList")) return

    const { items, categories } = JSON.parse(
      localStorage.getItem("shoppingList")
    )

    if (items) {
      state.commit("SET_ITEMS", items)
    }
    if (categories) {
      state.commit("SET_CATEGORIES", categories)
    }
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
    dispatch("setShoppingInStorage")
  },

  updateItemQuantity({ commit, dispatch }, { id, quantity }) {
    commit("UPDATE_ITEM_QUANTITY", { id, quantity })
    dispatch("setShoppingInStorage")
  },

  updateItemCategory({ commit, dispatch }, { id, categoryId }) {
    commit("UPDATE_ITEM_CATEGORY", { id, categoryId })
    dispatch("setShoppingInStorage")
  },

  updateItemName({ commit, dispatch }, { id, name }) {
    commit("UPDATE_ITEM_NAME", { id, name })
    dispatch("setShoppingInStorage")
  },

  updateCategoryName({ commit, dispatch }, { id, name }) {
    commit("UPDATE_CATEGORY_NAME", { id, name })
    dispatch("setShoppingInStorage")
  },

  removeItem({ commit, dispatch }, id) {
    commit("REMOVE_ITEM", id)
    dispatch("setShoppingInStorage")
  },

  removeCategory({ commit, dispatch }, id) {
    commit("REMOVE_CATEGORY", id)
    dispatch("setShoppingInStorage")
  },

  clearPurchased({ commit, dispatch }) {
    commit("CLEAR_PURCHASED")
    dispatch("setShoppingInStorage")
  },

  toggleCategoryVisibility({ commit, dispatch }, id) {
    commit("TOGGLE_CATEGORY_VISIBILITY", id)
    dispatch("setShoppingInStorage")
  },

  setItemCategory({ commit, dispatch }, { id, categoryId }) {
    commit("UPDATE_ITEM_CATEGORY", { id, categoryId })
    dispatch("setShoppingInStorage")
  },
}
