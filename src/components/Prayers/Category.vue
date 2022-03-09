<template>
  <div class="container flex flex-col mx-auto">
    <input
      type="text"
      v-model="nameModel"
      class="text-3xl font-bold"
      placeholder="Category name"
    />
    <input
      type="text"
      v-model="colorModel"
      placeholder="Category colour"
      :style="{ background: catColour }"
    />
    <input
      type="number"
      v-model.number="sortOrderModel"
      placeholder="Sort order"
    />
    <h3>Prayers</h3>
    <PrayerItem
      v-for="prayer in categoryPrayers"
      v-bind="{ ...prayer }"
      :key="prayer.id"
    />
    <div class="flex flex-col items-start w-full">
      <div class="flex flex-col w-full">
        <input type="text" v-model="prayerName" placeholder="Prayer name" />
        <textarea-autosize
          v-model="prayerText"
          placeholder="Prayer text"
          class="w-full"
        />
      </div>
      <button @click="addPrayer">
        <font-awesome-icon icon="plus" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import PrayerItem from "./PrayerItem.vue"

export default {
  name: "PrayerCategory",
  components: { PrayerItem },
  data() {
    return {
      prayerName: "",
      prayerText: "",
    }
  },
  computed: {
    ...mapState({
      prayers: (state) => state.prayers.prayers,
      categories: (state) => state.prayers.categories,
    }),
    categoryPrayers() {
      return this.prayers.filter(
        (prayer) => prayer.categoryId === this.$route.params.categoryId
      )
    },
    category() {
      return this.categories.find(
        (category) => category.id === this.$route.params.categoryId
      )
    },
    nameModel: {
      get() {
        return this.category.categoryName
      },
      set(name) {
        this.$store.dispatch("prayers/setCategoryName", {
          id: this.category.id,
          name,
        })
      },
    },
    colorModel: {
      get() {
        return this.category.colour
      },
      set(value) {
        this.$store.dispatch("prayers/setCategoryColour", {
          id: this.category.id,
          colour: value,
        })
      },
    },
    catColour() {
      return this.category.colour || "none"
    },
    sortOrderModel: {
      get() {
        return this.category.sortOrder
      },
      set(value) {
        this.$store.dispatch("prayers/setSortOrder", {
          id: this.category.id,
          order: value,
        })
      },
    },
  },
  methods: {
    addPrayer() {
      this.$store.dispatch("prayers/addPrayer", {
        categoryId: this.category.id,
        prayerName: this.prayerName,
        prayerText: this.prayerText,
      })
      this.prayerName = ""
      this.prayerText = ""
    },
  },
}
</script>
