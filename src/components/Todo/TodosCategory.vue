<template>
  <div>
    <h3>{{ category }}</h3>
    <h3>{{ id }}</h3>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: "TodosCategory",
  computed: {
    id: function () {
      return this.$route.params.categoryId
    },
    ...mapState({
      categories: (state) => state.todos.categories,
      todos: (state) => state.todos.todos,
    }),
    category() {
      const cat = this.categories.find((category) => category.id === this.id)
      console.log(this.categories)
      return cat
    },
    todos() {
      return this.todos.filter((todo) => todo.categoryId === this.id)
    },
  },
}
</script>
