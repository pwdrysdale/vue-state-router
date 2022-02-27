<template>
  <div>
    <h3>This is the categories</h3>
    <div
      v-for="category in categories"
      v-bind:key="category.id"
      class="border-b-2 border-gray-700"
      :style="{ background: category.colour }"
    >
      <label for="category-name">Name: </label>
      <input
        :value="category.categoryName"
        @input="setCategoryName(category.id, $event.target.value)"
        id="category-name"
      />
      <label for="category-color">Color: </label>
      <input
        :value="category.colour"
        @input="setCategoryColour(category.id, $event.target.value)"
        id="category-colour"
      />
      <label for="category-sort-order">Sort Order: </label>
      <input
        :value="category.sortOrder"
        @input="setSortOrder(category.id, $event.target.value)"
        id="category-sort-order"
      />
      <ToggleButton
        :checked="category.visible"
        :toggleFn="() => toggleCategoryVisibility(category.id)"
      />
      <button @click="deleteCategory(category.id)">
        <font-awesome-icon icon="trash" />
      </button>
    </div>
    <button @click="addCategory">
      <font-awesome-icon icon="plus" />
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex"

import ToggleButton from "../ToggleButton.vue"

export default {
  name: "CategoryManagement",
  components: {
    ToggleButton,
  },
  computed: {
    ...mapState({
      categories: (state) => state.prayers.categories,
    }),
  },
  methods: {
    addCategory() {
      this.$store.dispatch("prayers/addCategory")
    },
    setCategoryName(id, name) {
      this.$store.dispatch("prayers/setCategoryName", { id, name })
    },
    setCategoryColour(id, colour) {
      this.$store.dispatch("prayers/setCategoryColour", { id, colour })
    },
    setSortOrder(id, order) {
      this.$store.dispatch("prayers/setSortOrder", { id, order })
    },
    toggleCategoryVisibility(id) {
      this.$store.dispatch("prayers/toggleCategoryVisibility", {
        id,
      })
    },
    deleteCategory(id) {
      this.$store.dispatch("prayers/removeCategory", id)
    },
  },
}
</script>
