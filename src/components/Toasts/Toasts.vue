<template>
  <div class="fixed flex flex-col items-end bottom-4 right-4">
    <div
      v-for="toast of toasts"
      :key="toast.id"
      class="px-4 py-2 mb-2 rounded-md color-white"
      :class="
        toast.type === 'error'
          ? 'bg-red-600'
          : toast.type === 'success'
          ? 'bg-green-600'
          : toast.type === 'info'
          ? 'bg-blue-600'
          : toast.type === 'warning'
          ? 'bg-yellow-600'
          : 'bg-purple-600'
      "
    >
      {{ toast.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Toasts",
  computed: {
    toasts() {
      return this.$store.state.toasts.toasts
    },
  },
}
</script>
