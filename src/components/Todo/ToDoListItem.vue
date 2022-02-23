<template>
  <div class="gap-1 item">
    <ToggleButton :checked="todo.completed" :toggleFn="toggleCompleted" />
    <textarea-autosize autosize rows="1" v-model="textModel" />
    <input
      type="date"
      :value="todo.dueDate.toISOString().split('T')[0]"
      @input="setDate($event.target.value, todo)"
    />
    <button @click="removeTodo(todo)" class="mx-2">
      <font-awesome-icon icon="trash" />
    </button>
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
  </div>
</template>

<script>
import ToggleButton from "../ToggleButton.vue"

export default {
  name: "ToDoListItem",
  props: ["todo"],
  components: {
    ToggleButton,
  },
  computed: {
    textModel: {
      get() {
        return this.todo.text
      },
      set(value) {
        this.$store.dispatch("todos/setTodo", {
          ...this.todo,
          text: value,
        })
        this.setInLocal()
      },
    },
  },
  methods: {
    toggleCompleted() {
      this.$store.dispatch("todos/setTodo", {
        ...this.todo,
        completed: !this.todo.completed,
      })
      this.setInLocal()
    },
    removeTodo(todo) {
      this.$store.dispatch("todos/removeTodo", todo)
    },
    setDate(date, todo) {
      const dueDate = new Date(date)
      this.$store.dispatch("todos/setTodo", { ...todo, dueDate })
      todo.dueDate = new Date(this.$el.value)
    },
    setInLocal() {
      this.$store.dispatch("todos/setInLocal")
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
