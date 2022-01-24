<template>
  <div class="item">
    <input
      type="checkbox"
      v-model="todo.completed"
      :id="todo.id"
      class="hide"
    />
    <label v-bind:key="todo.id" :for="todo.id">
      <font-awesome-icon
        icon="check"
        v-if="todo.completed"
        class="checkicon green"
      />
      <font-awesome-icon
        icon="times"
        v-if="!todo.completed"
        class="checkicon red"
      />
    </label>
    <textarea-autosize
      autosize
      rows="1"
      type="text"
      name="todo.text"
      v-bind="setInLocal()"
      v-model="todo.text"
    />
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
export default {
  name: "ToDoListItem",
  props: ["todo"],
  methods: {
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
};
</script>

<style scoped>
.item {
  @apply flex flex-row items-center justify-between py-2 mx-auto w-max border-b-2 border-gray-800;
}

.hide {
  display: none;
}

.checkicon {
  margin-right: 0.5em;
  width: 1em;
}

.green {
  color: green;
}

.red {
  color: red;
}
</style>
