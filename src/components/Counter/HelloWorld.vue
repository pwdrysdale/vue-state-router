<template>
  <div class="flex flex-col items-center px-10 mx-auto">
    <h3>Counters</h3>
    <div class="button-group">
      <button @click="nextSortCategory">{{ sortBy }}</button>
      <button @click="toggleSortOrder">{{ sortOrder }}</button>
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
  data() {
    return { sortBy: "Created Date", sortOrder: "Ascending" };
  },
  computed: {
    count() {
      return this.$store.state.count;
    },
    counters() {
      return [...this.$store.state.counters].sort((a, b) =>
        this.sortFn(a, b, this.sortBy, this.sortOrder)
      );
    },
  },
  methods: {
    addCounter() {
      return this.$store.dispatch("addCounter");
    },
    toggleSortOrder() {
      this.sortOrder =
        this.sortOrder === "Ascending" ? "Descending" : "Ascending";
    },
    nextSortCategory() {
      const options = ["Created Date", "Count", "Increment", "Name"];
      const index = options.indexOf(this.sortBy);
      const nextIndex = (index + 1) % options.length;
      this.sortBy = options[nextIndex];
    },
    sortFn(a, b, sortBy, sortOrder) {
      if (sortBy === "Created Date") {
        return sortOrder === "Ascending"
          ? a.createdAt - b.createdAt
          : b.createdAt - a.createdAt;
      } else if (sortBy === "Count") {
        return sortOrder === "Ascending"
          ? a.count - b.count
          : b.count - a.count;
      } else if (sortBy === "Increment") {
        return sortOrder === "Ascending"
          ? a.increment - b.increment
          : b.increment - a.increment;
      } else if (sortBy === "Name") {
        return sortOrder === "Ascending"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
    },
  },

  created() {
    this.$store.dispatch("getCountersFromLocalStorage");
  },
};
</script>
