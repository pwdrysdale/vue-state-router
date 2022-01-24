<template>
  <div id="app">
    <div class="mx-auto flex flex-col items-center">
      <font-awesome-icon icon="cross" class="text-9xl my-10" />
      <!-- <font-awesome-icon icon="fa-trash" class="icon" /> -->
      <h3>Pete's Toolkit</h3>
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
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  width: 100vw;
  @apply bg-gray-900 flex flex-col;
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
