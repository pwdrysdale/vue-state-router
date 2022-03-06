<template>
  <div class="container mx-auto">
    <div class="container flex-col items-center w-full">
      <h3 class="text-center">Shopping</h3>
      <div class="button-group">
        <button @click.prevent="cycleSortCriteria">
          {{ sortFilterCriteria.sortBy }}
        </button>
        <button @click.prevent="toggleSortOrder">
          {{ sortFilterCriteria.sortOrder }}
        </button>
        <button @click.prevent="hidePurchased">
          {{ sortFilterCriteria.hidePurchased ? "Show" : "Hide" }} Purchased
        </button>
        <button @click.prevent="hideQuantity">
          {{ sortFilterCriteria.hideQuantity ? "Show" : "Hide" }} Quantity
        </button>
        <button @click.prevent="clearPurchased">Clear Purchased</button>
        <button @click.prevent="clearAll">Clear All</button>
      </div>
      <div class="flex flex-col w-full">
        <h3 class="mx-2">List</h3>
        <ShoppingListItem
          v-for="item in filteredItems"
          :key="item.id"
          :item="{ ...item }"
        />
      </div>
      <div
        class="flex flex-col items-start gap-2 m-2 md:flex-row md:items-center"
      >
        <p>Add new item:</p>
        <input v-model="newItem.name" placeholder="New item" />
        <input v-model="newItem.quantity" placeholder="Quantity" />
        <select
          key="categoryId"
          v-model="newItem.categoryId"
          :style="{ background: catColour }"
        >
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
        <button @click.prevent="addItem">
          <font-awesome-icon icon="plus" />
        </button>
      </div>
    </div>
    <div class="py-2">
      <h3 class="mx-2">Categories</h3>
      <div class="flex flex-col gap-2">
        <Category
          v-for="category in categories"
          :key="category.id"
          :category="{ ...category }"
        />
      </div>
      <div
        class="flex flex-col items-start gap-2 m-2 md:flex-row md:items-center"
        :style="{ background: newCategory.colour }"
      >
        <p>Add new category:</p>
        <input v-model="newCategory.name" placeholder="New category" />
        <input v-model="newCategory.colour" placeholder="Colour" />
        <input
          v-model.number="newCategory.sortOrder"
          placeholder="Sort order"
        />
        <button @click.prevent="addCategory">
          <font-awesome-icon icon="plus" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import ShoppingListItem from "./ShoppingListItem.vue"
import Category from "./Category.vue"

export default {
  name: "ShoppingList",
  components: {
    ShoppingListItem,
    Category,
  },
  data() {
    return {
      newItem: {
        name: "",
        quantity: "",
        categoryId: "",
      },
      newCategory: {
        name: "",
        colour: "",
        sortOrder: 0,
        visible: true,
      },
    }
  },
  computed: {
    ...mapState({
      items: (state) => state.shoppingList.items,
      categories: (state) => state.shoppingList.categories,
      sortFilterCriteria: (state) => state.shoppingList.sortFilterCriteria,
      filteredItems: (state) => state.shoppingList.filteredItems,
    }),
    catColour() {
      return this.newItem.categoryId
        ? this.categories.find(
            (category) => category.id === this.newItem.categoryId
          )?.colour || "none"
        : "none"
    },
  },

  methods: {
    addItem() {
      this.$store.dispatch("shoppingList/addItem", this.newItem)
      this.newItem.name = ""
      this.newItem.quantity = ""
    },
    addCategory() {
      this.$store.dispatch("shoppingList/addCategory", this.newCategory)
      this.newCategory = {
        name: "",
        colour: "",
        sortOrder: 0,
        visible: true,
      }
    },
    clearPurchased() {
      this.$store.dispatch("shoppingList/clearPurchased")
    },
    clearAll() {
      this.$store.dispatch("shoppingList/clearAllItems")
    },
    cycleSortCriteria() {
      this.$store.dispatch("shoppingList/setFilterCriteria")
    },
    toggleSortOrder() {
      this.$store.dispatch("shoppingList/toggleSortOrder")
    },
    hidePurchased() {
      this.$store.dispatch("shoppingList/toggleHidePurchased")
    },
    hideQuantity() {
      this.$store.dispatch("shoppingList/toggleHideQuantity")
    },
  },
  created() {
    this.$store.dispatch("shoppingList/loadShoppingFromStorage")
  },
}
</script>
