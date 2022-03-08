<template>
  <div
    :style="{ background: category.colour }"
    class="flex flex-col items-start justify-between p-2 rounded-md md:py-0 md:items-center md:flex-row"
  >
    <input v-model="nameModel" placeholder="Category name" />
    <input v-model="colorModel" placeholder="Category colour" />
    <input v-model.number="sortOrderModel" placeholder="Sort order" />
    <div class="button-group">
      <ToggleButton
        :checked="category.visible"
        :toggleFn="toggleCategoryVisibility"
      />
      <button @click="deleteCategory">
        <font-awesome-icon icon="trash" />
      </button>
    </div>
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
  computed: {
    sortOrderModel: {
      get() {
        return this.category.sortOrder
      },
      set(value) {
        this.$store.dispatch("shoppingList/updateCategorySortOrder", {
          id: this.category.id,
          sortOrder: value,
        })
      },
    },
    colorModel: {
      get() {
        return this.category.colour
      },
      set(value) {
        this.$store.dispatch("shoppingList/updateCategoryColour", {
          id: this.category.id,
          colour: value,
        })
      },
    },
    nameModel: {
      get() {
        return this.category.name
      },
      set(value) {
        this.$store.dispatch("shoppingList/updateCategoryName", {
          id: this.category.id,
          name: value,
        })
      },
    },
  },
}
</script>
