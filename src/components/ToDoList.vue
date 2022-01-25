<template>
  <div class="ToDos mx-auto px-10">
    <h3 class="text-center">To Do's</h3>
    <div class="button-group">
      <button v-on:click="changeSortCategory">{{ sort }}</button>
      <button v-on:click="changeSortOrder">{{ sortOrder }}</button>
    </div>
    <div class="list">
      <ToDoListItem v-for="todo in todos" v-bind:key="todo.id" :todo="todo" />
    </div>

    <div class="button-group flex w-full">
      <input type="text" v-model="newTodo" placeholder="Add a to do here..." />
      <button v-on:click="addTodo">Add Todo</button>
      <button @click="clearCompleted">Clear Completed</button>
      <button @click="clearAll">Clear All</button>
    </div>
  </div>
</template>

<script>
import ToDoListItem from "./ToDoListItem.vue";

export default {
  name: "ToDoList",
  data() {
    return {
      newTodo: "",
      sort: "Created Date",
      sortOrder: "Ascending",
    };
  },
  computed: {
    todos() {
      return [...this.$store.state.todos].sort((a, b) =>
        this.sortBy(a, b, this.sort, this.sortOrder)
      );
    },
  },
  methods: {
    addTodo() {
      this.$store.dispatch("addTodo", this.newTodo);
      this.newTodo = "";
    },
    changeSortCategory() {
      const options = [
        "Created Date",
        "Due Date",
        "Priority",
        "Completed",
        "Todo Text",
      ];
      const index = options.indexOf(this.sort);
      const nextIndex = (index + 1) % options.length;
      this.sort = options[nextIndex];
    },
    changeSortOrder() {
      this.sortOrder =
        this.sortOrder === "Ascending" ? "Descending" : "Ascending";
    },
    clearCompleted() {
      this.$store.dispatch("clearCompleted");
    },
    clearAll() {
      this.$store.dispatch("clearAll");
    },
    sortBy(a, b, sort, sortOrder) {
      if (sort === "Created Date") {
        return sortOrder === "Ascending"
          ? a.createdDate - b.createdDate
          : b.createdDate - a.createdDate;
      } else if (sort === "Due Date") {
        return sortOrder === "Ascending"
          ? a.dueDate - b.dueDate
          : b.dueDate - a.dueDate;
      } else if (sort === "Priority") {
        return sortOrder === "Ascending"
          ? a.priority - b.priority
          : b.priority - a.priority;
      } else if (sort === "Completed") {
        return sortOrder === "Ascending"
          ? a.completed
            ? -1
            : 1
          : a.completed
          ? 1
          : -1;
      } else if (sort === "Todo Text") {
        return sortOrder === "Ascending"
          ? a.text.localeCompare(b.text)
          : b.text.localeCompare(a.text);
      }
    },
  },
  async created() {
    this.$store.dispatch("getTodosFromLocal");
  },
  components: {
    ToDoListItem,
  },
};
</script>

<style scoped>
.list {
  @apply flex flex-col items-center justify-center mx-auto w-max;
}
</style>
