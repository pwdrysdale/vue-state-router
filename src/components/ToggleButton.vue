<template>
  <button
    @click="toggle"
    class="transition-all duration-300"
    :class="
      checked
        ? 'bg-green-800 hover:bg-green-500'
        : 'bg-red-800 hover:bg-red-500'
    "
  >
    <font-awesome-icon v-if="!checked" icon="times" />
    <font-awesome-icon v-else icon="check" />
  </button>
</template>

<script>
export default {
  name: "ToggleButton",
  props: ["checked", "toggleFn"],
  methods: {
    toggle() {
      this.toggleFn()
    },
  },
}
</script>
