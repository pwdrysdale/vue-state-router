<template>
  <div id="app">
    <div class="flex flex-col items-center w-full mx-auto">
      <font-awesome-icon icon="cross" class="my-10 text-9xl" />
      <!-- <font-awesome-icon icon="fa-trash" class="icon" /> -->
      <input v-model="name" class="text-4xl font-bold text-center" />
      <Navigation />
    </div>
    <router-view />
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";

export default {
  name: "App",
  components: { Navigation },
  computed: {
    name: {
      get() {
        return this.$store.state.name;
      },
      set(name) {
        this.$store.dispatch("setName", name);
      },
    },
  },
  created() {
    this.$store.dispatch("loadName");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @apply bg-gray-900 flex flex-col min-h-screen min-w-full;
}

body {
  margin: 0;
  padding: 0;
  background: black;
  color: white;
}

button {
  background: blue;
  border-radius: 5px;
  border: none;
  color: white;
  font-size: 1em;
  padding: 0.5em;
  cursor: pointer;
}

input {
  border-radius: 5px;
  border: none;
  background: inherit;
  color: white;
  font-size: 1em;
  padding: 0.5em;
}

.icon {
  color: white;
}
</style>
