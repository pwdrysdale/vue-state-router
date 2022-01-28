<template>
  <div
    class="flex flex-col items-center w-full my-2 border-b-2 border-gray-800"
  >
    <div>
      <textarea-autosize
        autosize
        name="text"
        type="text"
        v-model="name"
        rows="1"
        class="w-32 text-center md:w-64 lg:w-full"
      />
    </div>
    <h1>{{ displayTime() }}</h1>
    <div class="button-group">
      <button
        v-if="this.interval === null || this.interval === 0"
        @click="startTimer"
      >
        <font-awesome-icon icon="play" />
      </button>
      <button v-if="interval !== null" @click="stopTimer">
        <font-awesome-icon icon="stop" />
      </button>
      <button @click="restartTimer">
        <font-awesome-icon icon="redo" />
      </button>
      <button @click="removeTimer"><font-awesome-icon icon="trash" /></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Timer",
  props: {
    id: String,
    timerName: String,
    time: Number,
    interval: Number,
  },
  computed: {
    name: {
      get() {
        return this.timerName;
      },
      set(name) {
        this.setTimerName({ id: this.id, name });
      },
    },
  },
  methods: {
    removeTimer() {
      this.$store.commit("removeTimer", this.id);
    },
    startTimer() {
      this.$store.commit("startTimer", this.id);
    },
    stopTimer() {
      this.$store.commit("stopTimer", this.id);
    },
    restartTimer() {
      this.$store.commit("resetTimer", this.id);
    },
    setTimerName(payload) {
      this.$store.commit("setTimerName", payload);
    },

    displayTime() {
      //format dd:hh:mm:ss
      // return "hello";
      let seconds =
        this.time % 60 < 10 ? "0" + (this.time % 60) : this.time % 60;
      let minutes =
        Math.floor(this.time / 60) % 60 < 10
          ? "0" + (Math.floor(this.time / 60) % 60)
          : Math.floor(this.time / 60) % 60;
      let hours =
        Math.floor(this.time / 3600) % 24 < 10
          ? "0" + (Math.floor(this.time / 3600) % 24)
          : Math.floor(this.time / 3600) % 24;
      let days =
        Math.floor(this.time / 86400) < 10
          ? "0" + Math.floor(this.time / 86400)
          : Math.floor(this.time / 86400);
      //return only when there are no zero values
      if (days === "00" && hours === "00" && minutes === "00") {
        return parseFloat(seconds);
      } else if (days === "00" && hours === "00") {
        return `${minutes}:${seconds}`;
      } else if (days === "00") {
        return `${hours}:${minutes}:${seconds}`;
      } else {
        return `${days}:${hours}:${minutes}:${seconds}`;
      }
    },
  },
};
</script>
