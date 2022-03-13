<template>
  <div class="flex items-start gap-2 my-2 overflow-y-scroll rounded-md">
    <div
      v-for="category in categories"
      :key="category.id"
      class="flex flex-col items-start p-2 rounded-md"
      :style="{ background: category.colour }"
    >
      <div class="category-group">
        <label for="categoryName">Category Name:</label>
        <input
          :value="category.name"
          @input="setCategoryName(category.id, $event.target.value)"
          placeholder="Category name"
          id="categoryName"
        />
      </div>
      <div class="category-group">
        <label for="categoryColor">Category Color:</label>
        <input
          :value="category.colour"
          @input="setCategoryColour(category.id, $event.target.value)"
          placeholder="Category color"
          id="categoryColor"
        />
      </div>
      <div class="category-group">
        <label for="categorySortOrder">Sort Order:</label>
        <input
          :value="category.sortOrder"
          @input="setSortOrder(category.id, $event.target.value)"
          placeholder="Sort order"
          id="categorySortOrder"
        />
      </div>
      <div class="category-group">
        <p>Visible:</p>
        <ToggleButton
          :checked="category.visible"
          :toggleFn="() => toggleCategoryVisibility(category.id)"
        />
      </div>
      <div class="items-start button-group">
        <router-link
          :to="{ name: 'TodosCategory', params: { categoryId: category.id } }"
        >
          <button>
            <font-awesome-icon icon="eye" />
          </button>
        </router-link>
        <button @click="deleteCategory(category.id)">
          <font-awesome-icon icon="trash" />
        </button>
      </div>
    </div>
    <button @click.prevent="addCategory">
      <font-awesome-icon icon="plus" />
    </button>
  </div>
</template>

<script>
import ToggleButton from "../ToggleButton.vue"

import { mapState } from "vuex"
export default {
  name: "CategoryManagement",
  components: {
    ToggleButton,
  },

  computed: {
    ...mapState({
      categories: (state) => state.todos.categories,
    }),
  },
  methods: {
    addCategory() {
      this.$store.dispatch("todos/addCategory")
    },
    setCategoryName(id, name) {
      this.$store.dispatch("todos/setCategoryName", { id, name })
    },
    setCategoryColour(id, colour) {
      this.$store.dispatch("todos/setCategoryColour", { id, colour })
    },
    setSortOrder(id, sortOrder) {
      this.$store.dispatch("todos/setCategorySortOrder", { id, sortOrder })
    },
    toggleCategoryVisibility(id) {
      this.$store.dispatch("todos/toggleCategoryVisibility", { id })
    },
    deleteCategory(id) {
      this.$store.dispatch("todos/removeCategory", { id })
    },
  },
}
</script>
