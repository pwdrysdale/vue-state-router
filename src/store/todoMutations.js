import { v4 as uuid } from "uuid";

export default {
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
