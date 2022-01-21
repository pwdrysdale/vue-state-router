<template>
  <div id="app">
    <h3>Vue - Learning State with Router</h3>
    <Navigation />
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
</style>
