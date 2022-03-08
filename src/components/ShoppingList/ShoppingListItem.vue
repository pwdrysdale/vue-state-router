<template>
  <div
    class="container flex flex-col items-start justify-between border-b-2 border-gray-800 md:py-2 gap-0mx-auto md:gap-2 md:items-center md:flex-row"
  >
    <ToggleButton
      :checked="item.purchased"
      :toggleFn="togglePurchased"
      class="hidden md:inline-block"
    />
    <div class="flex flex-row w-full md:flex-1 space-between">
      <input v-model="nameModel" placeholder="Item name" class="flex-1" />
      <div class="button-group">
        <ToggleButton
          :checked="item.purchased"
          :toggleFn="togglePurchased"
          class="inline-block md:hidden"
        />
        <button @click.prevent="deleteItem" class="inline-block md:hidden">
          <font-awesome-icon icon="trash" />
        </button>
      </div>
    </div>
    <input
      v-model="item.quantity"
      placeholder="Quantity"
      class="flex-1"
      v-show="sortFilterCriteria.hideQuantity"
    />
    <select
      v-model="categoryModel"
      :style="{ background: catColour }"
      v-show="!sortFilterCriteria.hideCategory"
      class="w-full md:w-min"
      placeholder="Category"
    >
      <option disabled class="text-white" value="">Select category</option>

      <option
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>
    <div class="hidden md:inline-block">
      <ToggleButton
        :checked="item.purchased"
        :toggleFn="togglePurchased"
        class="inline-block md:hidden"
      />
      <button @click.prevent="deleteItem">
        <font-awesome-icon icon="trash" />
      </button>
    </div>
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
      sortFilterCriteria: (state) => state.shoppingList.sortFilterCriteria,
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
        this.$store.dispatch("shoppingList/updateItemName", {
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
