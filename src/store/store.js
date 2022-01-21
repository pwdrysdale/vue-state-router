import Vue from "vue";
import Vuex from "vuex";

import { v4 as uuid } from "uuid";

Vue.use(Vuex);

const todoMutations = {
  loadTodos(state, todos) {
    state.todos = todos;
  },
  addTodoMutation(state, todo) {
    state.todos.push({
      id: uuid(),
      text: todo,
      done: false,
      dueDate: new Date(),
      createdDate: new Date(),
      priority: 3,
    });
  },
  removeTodoMutation(state, todo) {
    state.todos = state.todos.filter((t) => t.id !== todo.id);
  },
  setToDoMutation(state, payload) {
    state.todos = state.todos.map((t) => {
      if (t.id === payload.id) {
        return {
          ...t,
          ...payload,
        };
      }
      return t;
    });
  },
};

const todoActions = {
  setInLocal() {
    localStorage.setItem("vuetodos", JSON.stringify(this.state.todos));
  },
  addTodo(context, newTodo) {
    context.commit("addTodoMutation", newTodo);
    context.dispatch("setInLocal");
  },
  removeTodo(context, todo) {
    context.commit("removeTodoMutation", todo);
    context.dispatch("setInLocal");
  },
  setTodo(context, payload) {
    context.commit("setToDoMutation", payload);
    context.dispatch("setInLocal");
  },
  getTodosFromLocal(context) {
    const todos = localStorage.getItem("vuetodos")
      ? JSON.parse(localStorage.getItem("vuetodos"))
      : [];
    const datesFixed = todos.map((todo) => {
      return {
        ...todo,
        dueDate: new Date(todo.dueDate),
        createdDate: new Date(todo.createdDate),
      };
    });
    context.commit("loadTodos", datesFixed);
  },
};

const store = new Vuex.Store({
  state: {
    count: 0,
    todos: [
      {
        id: uuid(),
        text: "Welcome to your todo list!",
        completed: true,
        dueDate: new Date(),
        createdDate: new Date(),
        priority: 3,
      },
    ],
  },
  mutations: {
    ...todoMutations,
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
    reset(state) {
      state.count = 0;
    },
  },
  actions: {
    ...todoActions,
  },
});

export default store;
