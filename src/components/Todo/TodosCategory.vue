<template>
  <div class="flex flex-col">
    <input v-model="nameModel" placeholder="Category Name" />
    <input
      v-model="colourModel"
      :style="{ background: catColour }"
      placeholder="Category Colour"
    />
    <div class="button-group">
      <button v-on:click="changeSortCategory">{{ sortBy }}</button>
      <button v-on:click="changeSortOrder">
        <font-awesome-icon v-if="sortOrder === 'Ascending'" icon="arrow-up" />
        <font-awesome-icon v-else icon="arrow-down" />
      </button>
    </div>
    <ToDoListItem v-for="todo in todos" :key="todo.id" :todo="{ ...todo }" />
    <div class="flex justify-center w-full">
      <input v-model="name" placeholder="Add a to do here..." />
      <button @click.prevent="addToDo">
        <font-awesome-icon icon="plus" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"
import ToDoListItem from "./ToDoListItem.vue"

export default {
  name: "TodosCategory",
  components: {
    ToDoListItem,
  },
  data() {
    return {
      name: "",
    }
  },
  computed: {
    id: function () {
      return this.$route.params.categoryId
    },
    ...mapState({
      categories: (state) => state.todos.categories,
      sortOrder: (state) => state.todos.sfOptions.sortOrder,
      sortBy: (state) => state.todos.sfOptions.sortBy,
    }),
    ...mapGetters("todos", ["todosByCategory", "todosCategory"]),
    category() {
      return this.todosCategory(this.$route.params.categoryId)
    },
    todos() {
      return this.todosByCategory(this.$route.params.categoryId)
    },
    nameModel: {
      get() {
        return this.category.name
      },
      set(value) {
        this.$store.dispatch("todos/setCategoryName", {
          id: this.id,
          name: value,
        })
      },
    },
    colourModel: {
      get() {
        return this.category.colour
      },
      set(value) {
        this.$store.dispatch("todos/setCategoryColour", {
          id: this.id,
          colour: value,
        })
      },
    },
    catColour() {
      return this.category.colour || "none"
    },
  },
  created() {
    if (!this.$store.todos || !this.$store.todos.categories) {
      this.$store.dispatch("todos/getTodosFromLocal")
    }
  },
  methods: {
    changeSortCategory() {
      this.$store.dispatch("todos/setSortBy")
    },
    changeSortOrder() {
      this.$store.dispatch("todos/toggleSortOrder")
    },
    addToDo() {
      this.$store.dispatch("todos/addTodo", {
        categoryId: this.id,
        text: this.name,
      })
      this.name = ""
    },
  },
}
</script>
