<template>
  <div class="container flex flex-col justify-between flex-1 mx-auto">
    <div>
      <h3 class="text-center">Bible In A Year</h3>
      <div class="items-center button-group">
        <span>View: </span>
        <select v-model="filterModel" class="text-center">
          <option>0-1</option>
          <option>1-1</option>
          <option>2-1</option>
          <option>5-1</option>
          <option>10-0</option>
          <option>All Completed</option>
          <option>All Incomplete</option>
          <option>All</option>
        </select>
      </div>
      <ReadingItem
        v-for="(day, idx) in plan"
        :key="day.id"
        class="my-2 border-b-2 border-gray-800"
        v-bind="{
          day,
          idx,
        }"
      />
    </div>
    <div class="button-group">
      <button @click="resetCompleted">Reset Completed</button>
      <button @click="resetReflections">Reset Reflections</button>
    </div>
  </div>
</template>

<script>
import ReadingItem from "./ReadingItem.vue";

export default {
  name: "Progress",
  components: {
    ReadingItem,
  },
  data() {
    return {
      filter: "1-1",
    };
  },
  computed: {
    plan() {
      const all = this.$store.state.reading;
      if (this.filter === "0-1") {
        return [all.find((day) => day.completedDate === null)];
      } else if (this.filter === "1-1") {
        const lastCompletedIndex = all.reduce(
          (acc, day, index) => (day.completedDate ? index : acc),
          0
        );
        return all.slice(lastCompletedIndex, lastCompletedIndex + 2);
      } else if (this.filter === "2-1") {
        const lastCompletedIndex = all.reduce(
          (acc, day, index) => (day.completedDate ? index : acc),
          0
        );
        return all.slice(
          Math.max(0, lastCompletedIndex - 1),
          lastCompletedIndex + 2
        );
      } else if (this.filter === "5-1") {
        const lastCompletedIndex = all.reduce(
          (acc, day, index) => (day.completedDate ? index : acc),
          0
        );
        return all.slice(
          Math.max(0, lastCompletedIndex - 4),
          lastCompletedIndex + 2
        );
      } else if (this.filter === "10-0") {
        const lastCompletedIndex = all.reduce(
          (acc, day, index) => (day.completedDate ? index : acc),
          0
        );
        return all.slice(
          Math.max(lastCompletedIndex - 10, 0),
          lastCompletedIndex + 2
        );
      } else if (this.filter === "All Completed") {
        return all.filter((day) => day.completedDate !== null);
      } else if (this.filter === "All Incomplete") {
        return all.filter((day) => day.completedDate === null);
      } else {
        return all;
      }
    },
    filterModel: {
      get() {
        return this.filter;
      },
      set(value) {
        this.filter = value;
      },
    },
  },
  methods: {
    resetCompleted() {
      this.$store.dispatch("resetCompleted");
    },
    resetReflections() {
      this.$store.dispatch("resetReflections");
    },
  },
  created() {
    this.$store.dispatch("getReadingsFromLocal");
  },
};
</script>
