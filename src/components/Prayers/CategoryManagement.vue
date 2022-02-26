<template>
  <div>
    <h1>This is the categories</h1>
    <input
      v-for="category in categories"
      v-bind:key="category.id"
      v-bind="{ ...category }"
    />
    <button @click="addCategory">
      <font-awesome-icon icon="plus" />
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: "CategoryManagement",
  computed: {
    ...mapState({
      categories: (state) => state.prayers.categories,
    }),
  },
  methods: {
    addCategory() {
      this.$store.dispatch("prayers/addCategory")
    },
  },
}
</script>
