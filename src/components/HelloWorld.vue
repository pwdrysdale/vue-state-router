<template>
  <div class="mx-auto px-10 flex items-center flex-col">
    <h3>Vue Counter</h3>
    <h3>{{ count }}</h3>
    <div class="button-group">
      <button v-on:click="increment">Increment</button>
      <button v-on:click="decrement">Decrement</button>
      <button v-on:click="reset">Reset</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  computed: {
    count() {
      return this.$store.state.count;
    },
  },
  methods: {
    increment() {
      return this.$store.commit("increment");
    },
    decrement() {
      return this.$store.commit("decrement");
    },
    reset() {
      return this.$store.commit("reset");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
  color: white;
  font-size: 40px;
  font-weight: bold;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
