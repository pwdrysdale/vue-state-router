<template>
  <div :style="{ background: category.colour }">
    <input v-model="category.name" placeholder="Category name" />
    <input v-model="category.colour" placeholder="Category colour" />
    <input v-model.number="category.sortOrder" placeholder="Sort order" />
    <ToggleButton
      :checked="category.visible"
      :toggleFn="toggleCategoryVisibility"
    />
    <button @click="deleteCategory">
      <font-awesome-icon icon="trash" />
    </button>
  </div>
</template>

<script>
import ToggleButton from "../ToggleButton.vue"

export default {
  name: "Category",
  props: {
    category: Object,
  },
  components: {
    ToggleButton,
  },
  methods: {
    toggleCategoryVisibility() {
      this.$store.dispatch(
        "shoppingList/toggleCategoryVisibility",
        this.category.id
      )
    },
    deleteCategory() {
      this.$store.dispatch("shoppingList/removeCategory", this.category.id)
    },
  },
}
</script>
