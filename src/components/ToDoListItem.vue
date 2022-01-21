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
    <input
      type="text"
      name="todo.text"
      v-bind="setInLocal()"
      v-model="todo.text"
    />
    <button v-on:click="removeTodo(todo)">
      <font-awesome-icon icon="trash" />
    </button>
    <input
      type="date"
      :value="todo.dueDate.toISOString().split('T')[0]"
      @input="setDate($event.target.value, todo)"
    />
    <select v-model.number="todo.priority">
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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 3px auto 0 auto;
  width: max-content;
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
