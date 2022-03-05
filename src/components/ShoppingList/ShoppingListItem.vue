<template>
  <div>
    <ToggleButton :checked="item.purchased" :toggleFn="togglePurchased" />
    <input v-model="nameModel" placeholder="Item name" />
    <input v-model="item.quantity" placeholder="Quantity" />
    <select v-model="categoryModel" :style="{ background: catColour }">
      <option
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>
    <button @click.prevent="deleteItem">
      <font-awesome-icon icon="trash" />
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex"
import ToggleButton from "../ToggleButton.vue"

export default {
  name: "ShoppingListItem",
  props: {
    item: Object,
  },
  components: {
    ToggleButton,
  },
  computed: {
    ...mapState({
      categories: (state) => state.shoppingList.categories,
    }),
    catColour() {
      return this.item.categoryId
        ? this.categories.find(
            (category) => category.id === this.item.categoryId
          )?.colour || "none"
        : "none"
    },
    nameModel: {
      get() {
        return this.item.name
      },
      set(value) {
        this.$store.dispatch("shoppingList/setItemName", {
          id: this.item.id,
          name: value,
        })
      },
    },
    categoryModel: {
      get() {
        return this.item.categoryId
      },
      set(value) {
        console.log("setting category", value)
        this.$store.dispatch("shoppingList/setItemCategory", {
          id: this.item.id,
          categoryId: value,
        })
      },
    },
  },
  methods: {
    togglePurchased() {
      this.$store.dispatch("shoppingList/togglePurchased", this.item.id)
    },
    deleteItem() {
      this.$store.dispatch("shoppingList/removeItem", this.item.id)
    },
  },
}
</script>
