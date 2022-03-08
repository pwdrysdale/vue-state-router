<template>
  <div class="container flex flex-col items-center px-10 mx-auto">
    <h3>Timers</h3>
    <Timer
      v-for="(timer, index) of timers"
      v-bind:key="index"
      v-bind="{
        ...timer,
      }"
    />
    <div class="button-group">
      <button @click="addTimer">
        <font-awesome-icon icon="plus" />
      </button>
    </div>
  </div>
</template>

<script>
import Timer from "./Timer.vue"

export default {
  name: "TimerScreen",
  components: {
    Timer,
  },

  computed: {
    timers() {
      return this.$store.state.timers.timers
    },
  },

  methods: {
    addTimer() {
      this.$store.commit("timers/ADD_TIMER")
    },
  },
}
</script>
