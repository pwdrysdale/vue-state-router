export default {
  setInLocal() {
    localStorage.setItem("vuetodos", JSON.stringify(this.state.todos));
  },

  addTodo(context, newTodo) {
    context.dispatch("addToasts", {
      type: "success",
      text: "Added new todo: " + newTodo,
    });
    context.commit("addTodoMutation", newTodo);
    context.dispatch("setInLocal");
  },

  removeTodo(context, todo) {
    context.dispatch("addToasts", {
      type: "warning",
      text: "Removed todo: " + todo.text,
    });
    context.commit("removeTodoMutation", todo);
    context.dispatch("setInLocal");
  },

  setTodo(context, payload) {
    // get todo from state
    const todo = context.state.todos.find((t) => t.id === payload.id);
    if (todo.completed === false && payload.completed === true) {
      const textOptions = [
        "Good on you!",
        "Great job!",
        "Awesome!",
        "Boom!",
        "Well done!",
        "Nice!",
        "In the strength of the Lord!",
      ];

      const text = textOptions[Math.floor(Math.random() * textOptions.length)];

      context.dispatch("addToasts", {
        type: "success",
        text,
      });
    } else if (todo.completed === true && payload.completed === false) {
      context.dispatch("addToasts", {
        type: "warning",
        text: "Back to it I suppose...",
      });
    }

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

  clearCompleted(context) {
    // get the number of todos from the store
    const todosToGo = context.state.todos.filter(
      (todo) => !todo.completed
    ).length;

    const moreToGo = [
      "Feels good doesn't it?",
      "Yep and yep and yep!",
      "On the way Eddy!",
      "Keep it up!",
      "They see me rolling, they hatin'!",
    ];
    const done = [
      "Done!",
      "Done! Done! Done!",
      "Nothing more to do! How good is that?",
      "Time for a break!",
      "Yeah boi!",
    ];

    const text =
      todosToGo === 0
        ? done[Math.floor(Math.random() * done.length)]
        : moreToGo[Math.floor(Math.random() * moreToGo.length)];

    context.dispatch("addToasts", {
      text: text,
      type: "success",
    });
    context.commit("clearCompletedTodosMutation");
    context.dispatch("setInLocal");
  },

  clearAll(context) {
    const textOptions = [
      "All done!",
      "What to do's?",
      "Nothing to do!",
      "Starting fresh! Green is nice.",
    ];

    const text = textOptions[Math.floor(Math.random() * textOptions.length)];

    context.dispatch("addToasts", {
      text,
      type: "success",
    });

    context.commit("clearAllTodosMutation");
    context.dispatch("setInLocal");
  },
};
