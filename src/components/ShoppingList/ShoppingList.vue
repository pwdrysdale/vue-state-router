<template>
  <div>
    <div>
      <h3>Shopping List</h3>
      <ShoppingListItem
        v-for="item in items"
        :key="item.id"
        :item="{ ...item }"
      />
      <div class="button-group">
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
    <div>
      <h3>Categories</h3>
      <Category
        v-for="category in categories"
        :key="category.id"
        :category="{ ...category }"
      />
      <div class="button-group" :style="{ background: newCategory.colour }">
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
        category: "",
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
      this.newItem = {
        name: "",
        quantity: "",
      }
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
  },
  created() {
    this.$store.dispatch("shoppingList/loadShoppingFromStorage")
  },
}
</script>
