<template>
  <div class="container flex flex-col items-center px-10 mx-auto">
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
import { mapState } from "vuex";

export default {
  name: "HelloWorld",
  components: {
    Counter,
  },
  data() {
    return { sortBy: "Created Date", sortOrder: "Ascending" };
  },
  computed: {
    ...mapState({ counters: (state) => state.counters.counters }),
  },
  methods: {
    addCounter() {
      return this.$store.dispatch("counters/addCounter");
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
    this.$store.dispatch("counters/getCountersFromLocalStorage");
  },
};
</script>
