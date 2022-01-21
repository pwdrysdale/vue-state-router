export default {
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
