import { v4 as uuid } from "uuid"

export const namespaced = true

export const state = () => ({
  todos: [],
  sfTodos: [],
  categories: [],
  sfOptions: {
    sortOrder: "Ascending",
    sortBy: "Created Date",
  },
})

export const actions = {
  setInLocal() {
    localStorage.setItem("vuetodos", JSON.stringify(this.state.todos))
  },

  setSFTodos({ commit }) {
    commit("SET_SF_TODOS")
  },

  toggleSortOrder({ commit, dispatch }) {
    commit("TOGGLE_SORT_ORDER")
    dispatch("setSFTodos")
    dispatch("setInLocal")
  },

  setSortBy({ commit, dispatch }) {
    commit("SET_SORT_BY")
    dispatch("setSFTodos")
    dispatch("setInLocal")
  },

  addTodo(context, payload) {
    context.dispatch(
      "toasts/addToasts",
      {
        text: "Todo added: " + payload.text,
        type: "success",
      },
      { root: true }
    )
    context.commit("ADD_TODO", payload)
    context.dispatch("setInLocal")
    context.dispatch("setSFTodos")
  },

  removeTodo(context, todo) {
    context.dispatch(
      "toasts/addToasts",
      {
        type: "warning",
        text: "Removed todo: " + todo.text,
      },
      { root: true }
    )
    context.commit("REMOVE_TODO", todo)
    context.dispatch("setInLocal")
    context.dispatch("setSFTodos")
  },

  setTodo(context, payload) {
    // get todo from state
    const todo = context.state.todos.find((t) => t.id === payload.id)
    if (
      (todo.completed === false || !todo.completed) &&
      payload.completed === true
    ) {
      const textOptions = [
        "Good on you!",
        "Great job!",
        "Awesome!",
        "Boom!",
        "Well done!",
        "Nice!",
        "In the strength of the Lord!",
      ]

      const text = textOptions[Math.floor(Math.random() * textOptions.length)]

      context.dispatch(
        "toasts/addToasts",
        {
          type: "success",
          text,
        },
        { root: true }
      )
    } else if (todo.completed === true && payload.completed === false) {
      context.dispatch(
        "toasts/addToasts",
        {
          type: "warning",
          text: "Back to it I suppose...",
        },
        { root: true }
      )
    }

    context.commit("SET_TODOS", payload)
    context.dispatch("setInLocal")
    context.dispatch("setSFTodos")
  },

  getTodosFromLocal(context) {
    const load = localStorage.getItem("vuetodos")
    const parsed = JSON.parse(load)

    if (parsed instanceof Array) {
      context.commit("SET_TODOS", parsed)
      return
    }

    const { todos, categories, sfOptions } = parsed
    const categoryTodos =
      todos.map((t) => (!t.categoryId ? { ...t, categoryId: "" } : t)) || []

    const datesFixed = categoryTodos.map((todo) => {
      return {
        ...todo,
        dueDate: new Date(todo.dueDate),
        createdDate: new Date(todo.createdDate),
      }
    })
    context.commit("LOAD_TODOS", datesFixed)
    context.commit("LOAD_CATEGORIES", categories || [])
    context.commit(
      "LOAD_SF_OPTIONS",
      sfOptions || { sortOrder: "Ascending", sortBy: "Created Date" }
    )
    context.dispatch("setSFTodos")
  },

  clearCompleted({ state, commit, dispatch }) {
    // get the number of todos from the store
    const todosToGo = state.todos.filter((todo) => !todo.completed).length

    const moreToGo = [
      "Feels good doesn't it?",
      "Yep and yep and yep!",
      "On the way Eddy!",
      "Keep it up!",
      "They see me rolling, they hatin'!",
    ]
    const done = [
      "Done!",
      "Done! Done! Done!",
      "Nothing more to do! How good is that?",
      "Time for a break!",
      "Yeah boi!",
    ]

    const text =
      todosToGo === 0
        ? done[Math.floor(Math.random() * done.length)]
        : moreToGo[Math.floor(Math.random() * moreToGo.length)]

    dispatch(
      "toasts/addToasts",
      {
        text: text,
        type: "success",
      },
      { root: true }
    )
    commit("CLEAR_COMPLETED_TODOS")
    dispatch("setInLocal")
    dispatch("setSFTodos")
  },

  clearAll(context) {
    const textOptions = [
      "All done!",
      "What to do's?",
      "Nothing to do!",
      "Starting fresh! Green is nice.",
    ]

    const text = textOptions[Math.floor(Math.random() * textOptions.length)]

    context.dispatch("addToasts", {
      text,
      type: "success",
    })

    context.commit("CLEAR_ALL_TODOS")
    context.dispatch("setInLocal")
    context.dispatch("setSFTodos")
  },

  addCategory(context, newCategory) {
    context.commit("ADD_CATEGORY", {
      ...newCategory,
      id: uuid(),
      sortOrder: 0,
      visible: true,
    })
    context.dispatch("setInLocal")
    context.dispatch("setSFTodos")
  },

  removeCategory(context, category) {
    context.commit("REMOVE_CATEGORY", category)
    context.dispatch("setInLocal")
    context.dispatch("setSFTodos")
  },

  setCategoryName(context, payload) {
    context.commit("UPDATE_CATEGORY_NAME", payload)
    context.dispatch("setInLocal")
    context.dispatch("setSFTodos")
  },

  setCategorySortOrder(context, payload) {
    context.commit("SET_CATEGORY_SORT_ORDER", payload)
    context.dispatch("setInLocal")
    context.dispatch("setSFTodos")
  },

  toggleCategoryVisibility(context, payload) {
    context.commit("TOGGLE_CATEGORY_VISIBILITY", payload)
    context.dispatch("setInLocal")
    context.dispatch("setSFTodos")
  },

  setCategoryColour(context, payload) {
    context.commit("SET_CATEGORY_COLOUR", payload)
    context.dispatch("setInLocal")
    context.dispatch("setSFTodos")
  },
}

export const mutations = {
  LOAD_TODOS(state, todos) {
    state.todos = todos
  },

  LOAD_SF_OPTIONS(state, options) {
    state.sfOptions = options
  },

  SET_SF_TODOS(state) {
    const hiddenCategoryIds = state.categories
      .filter((c) => !c.visible)
      .map((c) => c.id)

    state.sfTodos = state.todos
      .filter((t) => !hiddenCategoryIds.includes(t.categoryId))
      .sort((a, b) => sortBy(a, b, state))
  },

  TOGGLE_SORT_ORDER(state) {
    state.sfOptions.sortOrder =
      state.sfOptions.sortOrder === "Ascending" ? "Descending" : "Ascending"
  },

  SET_SORT_BY(state) {
    const options = [
      "Created Date",
      "Due Date",
      "Category",
      "Priority",
      "Completed",
      "Todo Text",
    ]
    const index = options.indexOf(state.sfOptions.sortBy)
    const nextIndex = (index + 1) % options.length
    state.sfOptions.sortBy = options[nextIndex]
  },

  ADD_TODO(state, payload) {
    state.todos.push({
      id: uuid(),
      text: payload.text,
      done: false,
      categoryId: payload.categoryId || "",
      dueDate: new Date(),
      createdDate: new Date(),
      priority: 3,
    })
  },
  REMOVE_TODO(state, todo) {
    state.todos = state.todos.filter((t) => t.id !== todo.id)
  },
  CLEAR_COMPLETED_TODOS(state) {
    state.todos = state.todos.filter((t) => !t.completed)
  },
  CLEAR_ALL_TODOS(state) {
    state.todos = []
  },
  SET_TODOS(state, payload) {
    state.todos = state.todos.map((t) => {
      if (t.id === payload.id) {
        return {
          ...t,
          ...payload,
        }
      }
      return t
    })
  },
  ADD_CATEGORY(state, category) {
    state.categories.push(category)
  },

  UPDATE_CATEGORY_NAME(state, payload) {
    state.categories = state.categories.map((category) => {
      if (category.id === payload.id) {
        return {
          ...category,
          name: payload.name,
        }
      }
      return category
    })
  },

  SET_CATEGORY_COLOUR(state, payload) {
    state.categories = state.categories.map((category) => {
      if (category.id === payload.id) {
        return {
          ...category,
          colour: payload.colour,
        }
      }
      return category
    })
  },

  SET_CATEGORY_SORT_ORDER(state, payload) {
    state.categories = state.categories.map((category) => {
      if (category.id === payload.id) {
        return {
          ...category,
          sortOrder: payload.sortOrder,
        }
      }
      return category
    })
  },

  REMOVE_CATEGORY(state, category) {
    state.todos = state.todos.map((todo) => {
      if (todo.categoryId === category.id) {
        return {
          ...todo,
          categoryId: "",
        }
      }
      return todo
    })
    state.categories = state.categories.filter((c) => c.id !== category.id)
  },

  TOGGLE_CATEGORY_VISIBILITY(state, payload) {
    state.categories = state.categories.map((category) => {
      if (category.id === payload.id) {
        return {
          ...category,
          visible: !category.visible,
        }
      }
      return category
    })
  },

  LOAD_CATEGORIES(state, categories) {
    state.categories = categories
  },
}

export const getters = {
  todosByCategory: (state) => (id) => {
    return state.sfTodos.filter((todo) => todo.categoryId === id)
  },
  todosCategory: (state) => (id) => {
    return state.categories.find((category) => category.id === id)
  },
}

const sortBy = (a, b, state) => {
  const { sfOptions, categories } = state
  const { sortBy: sort, sortOrder } = sfOptions

  if (sort === "Created Date") {
    return sortOrder === "Ascending"
      ? a.createdDate - b.createdDate
      : b.createdDate - a.createdDate
  } else if (sort === "Due Date") {
    return sortOrder === "Ascending"
      ? a.dueDate - b.dueDate
      : b.dueDate - a.dueDate
  } else if (sort === "Category") {
    const aCategory = a.categoryId
      ? categories.find((c) => c.id === a.categoryId).sortOrder
      : 0
    const bCategory = b.categoryId
      ? categories.find((c) => c.id === b.categoryId).sortOrder
      : 0

    return sortOrder === "Ascending"
      ? aCategory - bCategory
      : bCategory - aCategory
  } else if (sort === "Priority") {
    return sortOrder === "Ascending"
      ? a.priority - b.priority
      : b.priority - a.priority
  } else if (sort === "Completed") {
    return sortOrder === "Ascending"
      ? a.completed
        ? -1
        : 1
      : a.completed
      ? 1
      : -1
  } else if (sort === "Todo Text") {
    return sortOrder === "Ascending"
      ? a.text.localeCompare(b.text)
      : b.text.localeCompare(a.text)
  }
}
