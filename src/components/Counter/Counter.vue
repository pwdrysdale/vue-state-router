<template>
  <div
    class="flex flex-col items-center w-full my-2 border-b-2 border-gray-800"
  >
    <div>
      <textarea-autosize v-model="nameModel" rows="1" class="text-center" />
    </div>
    <input
      type="number"
      v-model="counterModel"
      class="text-3xl font-bold text-center"
    />
    Increment:
    <input type="number" v-model="setIncrementModel" class="text-center" />
    <div class="button-group">
      <button @click="incrementCounter">
        <font-awesome-icon icon="arrow-up" />
      </button>
      <button @click="decrementCounter">
        <font-awesome-icon icon="arrow-down" />
      </button>
      <button @click="resetCounter"><font-awesome-icon icon="redo" /></button>
      <button @click="removeCounter"><font-awesome-icon icon="trash" /></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Counter",
  props: {
    name: String,
    count: Number,
    increment: Number,
    id: String,
  },
  computed: {
    nameModel: {
      get() {
        return this.name;
      },
      set(name) {
        this.$store.dispatch("setCounterName", { id: this.id, name });
      },
    },
    counterModel: {
      get() {
        return parseFloat(this.count);
      },
      set(count) {
        this.$store.dispatch("setCounterCount", {
          id: this.id,
          count: parseFloat(count),
        });
      },
    },
    setIncrementModel: {
      get() {
        return parseFloat(this.increment);
      },
      set(increment) {
        this.$store.dispatch("setCounterIncrement", {
          id: this.id,
          increment: parseFloat(increment),
        });
      },
    },
  },
  methods: {
    incrementCounter() {
      this.$store.dispatch("incrementCounter", this.id);
    },
    decrementCounter() {
      this.$store.dispatch("decrementCounter", this.id);
    },
    resetCounter() {
      this.$store.dispatch("resetCounter", this.id);
    },
    removeCounter() {
      this.$store.dispatch("removeCounter", this.id);
    },
  },
};
</script>
