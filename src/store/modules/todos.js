import { v4 as uuid } from "uuid"

export const namespaced = true

export const state = () => ({
  todos: [],
})

export const actions = {
  setInLocal() {
    localStorage.setItem("vuetodos", JSON.stringify(this.state.todos))
  },

  addTodo(context, newTodo) {
    console.log(newTodo)
    context.dispatch(
      "toasts/addToasts",
      {
        text: "Todo added: " + newTodo,
        type: "success",
      },
      { root: true }
    )
    context.commit("addTodoMutation", newTodo)
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
    context.commit("removeTodoMutation", todo)
    context.dispatch("setInLocal")
  },

  setTodo(context, payload) {
    // get todo from state
    const todo = context.state.todos.find((t) => t.id === payload.id)
    if (todo.completed === false && payload.completed === true) {
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

    context.commit("setToDoMutation", payload)
    context.dispatch("setInLocal")
  },

  getTodosFromLocal(context) {
    const todos = localStorage.getItem("vuetodos")
      ? JSON.parse(localStorage.getItem("vuetodos"))
      : []
    const datesFixed = todos.todos.map((todo) => {
      return {
        ...todo,
        dueDate: new Date(todo.dueDate),
        createdDate: new Date(todo.createdDate),
      }
    })
    context.commit("loadTodos", datesFixed)
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
    commit("clearCompletedTodosMutation")
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

    context.commit("clearAllTodosMutation")
    context.dispatch("setInLocal")
  },
}

export const mutations = {
  loadTodos(state, todos) {
    state.todos = todos
  },
  addTodoMutation(state, todo) {
    state.todos.push({
      id: uuid(),
      text: todo,
      done: false,
      dueDate: new Date(),
      createdDate: new Date(),
      priority: 3,
    })
  },
  removeTodoMutation(state, todo) {
    state.todos = state.todos.filter((t) => t.id !== todo.id)
  },
  clearCompletedTodosMutation(state) {
    state.todos = state.todos.filter((t) => !t.completed)
  },
  clearAllTodosMutation(state) {
    state.todos = []
  },
  setToDoMutation(state, payload) {
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
}
