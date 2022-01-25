<template>
  <div class="mx-auto px-10 flex flex-col items-center">
    <h1>Timers</h1>
    <Timer
      v-for="(timer, index) of timers"
      v-bind:key="index"
      v-bind="{
        ...timer,
      }"
    />
    <div class="button-group">
      <button @click="addTimer">Add Timer</button>
    </div>
  </div>
</template>

<script>
import Timer from "./Timer.vue";

export default {
  name: "TimerScreen",
  components: {
    Timer,
  },

  computed: {
    timers() {
      return this.$store.state.timers;
    },
  },

  methods: {
    addTimer() {
      this.$store.commit("addTimer");
    },
  },
};
</script>
