import { v4 as uuid } from "uuid"

export const namespaced = true

export const state = () => ({
  todos: [],
  categories: [],
})

export const actions = {
  setInLocal() {
    localStorage.setItem("vuetodos", JSON.stringify(this.state.todos))
  },

  addTodo(context, newTodo) {
    context.dispatch(
      "toasts/addToasts",
      {
        text: "Todo added: " + newTodo,
        type: "success",
      },
      { root: true }
    )
    context.commit("ADD_TODO", newTodo)
    context.dispatch("setInLocal")
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
  },

  getTodosFromLocal(context) {
    const load = localStorage.getItem("vuetodos")
    const parsed = JSON.parse(load)

    if (parsed instanceof Array) {
      context.commit("SET_TODOS", parsed)
      return
    }

    const { todos, categories } = parsed
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
  },

  addCategory(context, newCategory) {
    context.commit("ADD_CATEGORY", {
      ...newCategory,
      id: uuid(),
      sortOrder: 0,
      visible: true,
    })
    context.dispatch("setInLocal")
  },

  removeCategory(context, category) {
    context.commit("REMOVE_CATEGORY", category)
    context.dispatch("setInLocal")
  },

  setCategoryName(context, payload) {
    context.commit("SET_CATEGORY_NAME", payload)
    context.dispatch("setInLocal")
  },

  setCategorySortOrder(context, payload) {
    context.commit("SET_CATEGORY_SORT_ORDER", payload)
    context.dispatch("setInLocal")
  },

  toggleCategoryVisibility(context, payload) {
    context.commit("TOGGLE_CATEGORY_VISIBILITY", payload)
    context.dispatch("setInLocal")
  },

  setCategoryColour(context, payload) {
    context.commit("SET_CATEGORY_COLOUR", payload)
    context.dispatch("setInLocal")
  },
}

export const mutations = {
  LOAD_TODOS(state, todos) {
    state.todos = todos
  },
  ADD_TODO(state, todo) {
    state.todos.push({
      id: uuid(),
      text: todo,
      done: false,
      categoryId: "",
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
    state.categories = state.categories.filter((c) => c.id !== category.id)
  },

  SET_TODOS_CATEGORY(state, payload) {
    state.todos = state.todos.map((todo) => {
      if (todo.id === payload.id) {
        return {
          ...todo,
          categoryId: payload.categoryId,
        }
      }
      return todo
    })
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
