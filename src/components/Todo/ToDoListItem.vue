<template>
  <div class="gap-1 item">
    <ToggleButton :checked="todo.completed" :toggleFn="toggleCompleted" />
    <textarea-autosize autosize rows="1" v-model="textModel" />

    <input
      type="date"
      :value="todo.dueDate.toISOString().split('T')[0]"
      @input="setDate($event.target.value, todo)"
    />
    <select
      v-model.number="todo.priority"
      class="opacity-80"
      :class="
        todo.priority === 5
          ? 'bg-purple-800'
          : todo.priority === 4
          ? 'bg-red-800'
          : todo.priority === 3
          ? 'bg-yellow-800'
          : todo.priority === 2
          ? 'bg-blue-800'
          : 'bg-green-800'
      "
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
    <select
      v-model="categoryModel"
      class="w-full md:w-min"
      placeholder="Category"
      :style="{ background: catColour }"
    >
      <option disabled class="text-white" value="">Select category</option>
      <option
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>
    <router-link
      :to="{ name: 'TodosCategory', params: { categoryId: todo.categoryId } }"
    >
      <button v-show="showCatLink">
        <font-awesome-icon icon="eye" />
      </button>
    </router-link>
    <button @click="removeTodo(todo)" class="mx-2">
      <font-awesome-icon icon="trash" />
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex"
import ToggleButton from "../ToggleButton.vue"

export default {
  name: "ToDoListItem",
  props: ["todo", "showCatLink"],
  components: {
    ToggleButton,
  },
  computed: {
    ...mapState({
      categories: (state) => state.todos.categories,
    }),
    catColour: function () {
      if (this.todo.categoryId) {
        const category = this.categories.find(
          (category) => category.id === this.todo.categoryId
        )

        if (category) {
          return category.colour
        } else {
          return "none"
        }
      } else {
        return "none"
      }
    },
    textModel: {
      get() {
        return this.todo.text
      },
      set(value) {
        this.$store.dispatch("todos/setTodo", {
          ...this.todo,
          text: value,
        })
      },
    },
    categoryModel: {
      get() {
        return this.todo.categoryId
      },
      set(value) {
        this.$store.dispatch("todos/setTodosCategory", {
          id: this.todo.id,
          categoryId: value,
        })
      },
    },
  },
  methods: {
    toggleCompleted() {
      this.$store.dispatch("todos/setTodo", {
        ...this.todo,
        completed: !this.todo.completed,
      })
    },
    removeTodo(todo) {
      this.$store.dispatch("todos/removeTodo", todo)
    },
    setDate(date, todo) {
      const dueDate = new Date(date)
      this.$store.dispatch("todos/setTodo", { ...todo, dueDate })
      todo.dueDate = new Date(this.$el.value)
    },
  },
}
</script>

<style scoped>
.item {
  @apply flex flex-row items-center justify-between py-2 mx-auto w-full border-b-2 border-gray-800;
}

.hide {
  @apply hidden;
}

.checkicon {
  @apply mr-2 w-4 cursor-pointer;
}

.green {
  @apply text-green-500;
}

.red {
  @apply text-red-500;
}
</style>
