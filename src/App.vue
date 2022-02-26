<template>
  <div class="flex flex-col min-h-screen px-2">
    <div class="flex flex-col items-center w-full mx-auto">
      <font-awesome-icon icon="cross" class="my-10 text-7xl" />
      <!-- <font-awesome-icon icon="fa-trash" class="icon" /> -->
      <input
        v-model="name"
        class="w-48 text-4xl font-bold text-center sm:w-72 lg:w-96"
      />
      <Navigation />
    </div>
    <router-view :key="$route.path" />
    <Toasts />
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue"
import Toasts from "./components/Toasts/Toasts.vue"

export default {
  name: "App",
  components: { Navigation, Toasts },
  computed: {
    name: {
      get() {
        return this.$store.state.appName.name
      },
      set(name) {
        this.$store.dispatch("appName/setName", name)
      },
    },
  },
  created() {
    this.$store.dispatch("appName/loadName")
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @apply flex flex-col min-h-screen min-w-full;
}
</style>
