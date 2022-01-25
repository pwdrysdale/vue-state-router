<template>
  <div class="mx-auto px-10 flex items-center flex-col">
    <h3>Counters</h3>
    <h3>{{ count }}</h3>
    <div class="button-group">
      <button v-on:click="increment">Increment</button>
      <button v-on:click="decrement">Decrement</button>
      <button v-on:click="reset">Reset</button>
    </div>
    <Counter
      v-for="counter in counters"
      v-bind:key="counter.id"
      v-bind="{ ...counter }"
    />
    <button @click="addCounter">Add Counter</button>
  </div>
</template>

<script>
import Counter from "./Counter.vue";

export default {
  name: "HelloWorld",
  components: {
    Counter,
  },
  computed: {
    count() {
      return this.$store.state.count;
    },
    counters() {
      return this.$store.state.counters;
    },
  },
  methods: {
    increment() {
      return this.$store.commit("increment");
    },
    decrement() {
      return this.$store.commit("decrement");
    },
    reset() {
      return this.$store.commit("reset");
    },
    addCounter() {
      return this.$store.dispatch("addCounter");
    },
  },
  created() {
    this.$store.dispatch("getCountersFromLocalStorage");
  },
};
</script>
