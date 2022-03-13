<template>
  <div
    class="flex items-start gap-2 overflow-scroll overflow-x-scroll rounded-md min-w-fit"
  >
    <div
      v-for="category in categories"
      v-bind:key="category.id"
      class="flex flex-col items-start p-2 rounded-md"
      :style="{ background: category.colour }"
    >
      <div class="category-group">
        <label for="category-name">Name: </label>
        <input
          :value="category.categoryName"
          @input="setCategoryName(category.id, $event.target.value)"
          placeholder="Category name"
          id="category-name"
        />
      </div>
      <div class="category-group">
        <label for="category-color">Color: </label>
        <input
          :value="category.colour"
          @input="setCategoryColour(category.id, $event.target.value)"
          placeholder="Category color"
          id="category-colour"
        />
      </div>
      <div class="category-group">
        <label for="category-sort-order whitespace-nowrap">Sort Order: </label>
        <input
          :value="category.sortOrder"
          @input="setSortOrder(category.id, $event.target.value)"
          placeholder="Sort order"
          id="category-sort-order"
        />
      </div>
      <div class="category-group">
        <p>Visible:</p>
        <ToggleButton
          :checked="category.visible"
          :toggleFn="() => toggleCategoryVisibility(category.id)"
        />
      </div>
      <div class="button-group">
        <router-link
          :to="{ name: 'PrayerCategory', params: { categoryId: category.id } }"
        >
          <button class="button">
            <font-awesome-icon icon="eye" />
          </button>
        </router-link>

        <button @click="deleteCategory(category.id)">
          <font-awesome-icon icon="trash" />
        </button>
      </div>
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
