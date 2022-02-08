<template>
  <div class="flex flex-col min-h-screen">
    <div class="flex flex-col items-center w-full mx-auto">
      <font-awesome-icon icon="cross" class="my-10 text-6xl" />
      <!-- <font-awesome-icon icon="fa-trash" class="icon" /> -->
      <input v-model="name" class="text-4xl font-bold text-center" />
      <Navigation />
    </div>
    <router-view />
    <Toasts />
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import Toasts from "./components/Toasts/Toasts.vue";

export default {
  name: "App",
  components: { Navigation, Toasts },
  computed: {
    name: {
      get() {
        return this.$store.state.appName.name;
      },
      set(name) {
        this.$store.dispatch("appName/setName", name);
      },
    },
  },
  created() {
    this.$store.dispatch("appName/loadName");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @apply flex flex-col min-h-screen min-w-full;
}
</style>
