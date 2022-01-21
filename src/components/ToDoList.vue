<template>
  <div class="ToDos">
    <h1>To Do's</h1>
    <ul>
      <li v-for="todo in todos" v-bind:key="todo.id">
        <input type="checkbox" v-model="todo.completed" />
        <input
          type="text"
          name="todo.text"
          v-bind="setInLocal()"
          v-model="todo.text"
        />
        <button v-on:click="removeTodo(todo)">Remove</button>
        <input
          type="date"
          :value="todo.dueDate.toISOString().split('T')[0]"
          @input="setDate($event.target.value, todo)"
        />
      </li>
    </ul>
    <p v-for="todo in todos" v-bind:key="todo.id">
      {{ todo.text }}
    </p>
    <input type="text" v-model="newTodo" placeholder="Add a to do here..." />
    <button v-on:click="addTodo">Add Todo</button>
  </div>
</template>

<script>
export default {
  name: "ToDoList",
  data() {
    return {
      newTodo: "",
    };
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    },
  },
  methods: {
    addTodo() {
      this.$store.dispatch("addTodo", this.newTodo);
      this.newTodo = "";
    },
    removeTodo(todo) {
      this.$store.dispatch("removeTodo", todo);
    },
    setDate(date, todo) {
      const dueDate = new Date(date);
      this.$store.dispatch("setTodo", { ...todo, dueDate });
      todo.dueDate = new Date(this.$el.value);
    },
    setInLocal() {
      this.$store.dispatch("setInLocal");
    },
  },
  async created() {
    this.$store.dispatch("getTodosFromLocal");
  },
};
</script>
