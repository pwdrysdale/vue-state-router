<template>
  <div class="container mx-auto">
    <h3>Categories</h3>
    <CategoryManagement />
    <h3>To Do's</h3>
    <div class="button-group">
      <button v-on:click="changeSortCategory">{{ sortBy }}</button>
      <button v-on:click="changeSortOrder">
        <font-awesome-icon v-if="sortOrder === 'Ascending'" icon="arrow-up" />
        <font-awesome-icon v-else icon="arrow-down" />
      </button>
    </div>
    <div class="list">
      <ToDoListItem
        v-for="todo in sfTodos"
        v-bind:key="todo.id"
        :todo="todo"
        showCatLink="true"
      />
    </div>

    <div class="flex w-full button-group">
      <input type="text" v-model="newTodo" placeholder="Add a to do here..." />
      <button v-on:click="addTodo">
        <font-awesome-icon icon="plus" />
      </button>
      <button @click="clearCompleted">Clear Completed</button>
      <button @click="clearAll">Clear All</button>
    </div>
  </div>
</template>

<script>
import CategoryManagement from "./CategoryManagement.vue"
import ToDoListItem from "../Todo/ToDoListItem.vue"
import { mapState } from "vuex"

export default {
  name: "ToDoList",

  data() {
    return {
      newTodo: "",
    }
  },
  computed: {
    ...mapState({
      sfTodos: (state) => state.todos.sfTodos,
      sortOrder: (state) => state.todos.sfOptions.sortOrder,
      sortBy: (state) => state.todos.sfOptions.sortBy,
    }),
  },
  methods: {
    addTodo() {
      this.$store.dispatch("todos/addTodo", { text: this.newTodo })
      this.newTodo = ""
    },
    changeSortCategory() {
      this.$store.dispatch("todos/setSortBy")
    },
    changeSortOrder() {
      this.$store.dispatch("todos/toggleSortOrder")
    },
    clearCompleted() {
      this.$store.dispatch("todos/clearCompleted")
    },
    clearAll() {
      this.$store.dispatch("todos/clearAll")
    },
  },
  async created() {
    this.$store.dispatch("todos/getTodosFromLocal")
  },
  components: {
    ToDoListItem,
    CategoryManagement,
  },
}
</script>

<style scoped>
.list {
  @apply flex flex-col items-center justify-center mx-auto w-full;
}
</style>
