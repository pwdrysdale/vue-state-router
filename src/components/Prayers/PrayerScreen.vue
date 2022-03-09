<template>
  <div class="container flex flex-col items-center mx-auto">
    <h3 class="text-center">Prayers</h3>

    <div class="button-group">
      <button @click="changeSortCategory">{{ sortCategory }}</button>
      <button @click="changeSortOrder">
        <font-awesome-icon v-if="sortOrder === 'Ascending'" icon="arrow-up" />
        <font-awesome-icon v-else icon="arrow-down" />
      </button>
      <button @click="toggleHideAnswered">
        {{ hideAnswered ? "Unhide Answered" : "Hide Answered" }}
      </button>
      <button @click="addPrayer">
        <font-awesome-icon icon="plus" />
      </button>
    </div>
    <div class="flex flex-col w-full gap-4 lg:grid-cols-4">
      <h3>Categories</h3>
      <CategoryManagement />
      <h3>All Prayers</h3>
      <PrayerItem
        v-for="prayer in sfPrayers"
        v-bind:key="prayer.id"
        v-bind="{ ...prayer }"
      />
      <div>
        <input type="text" v-model="prayerName" placeholder="Prayer name" />
        <textarea-autosize
          v-model="prayerText"
          placeholder="Prayer text"
          class="w-full"
        />
        <select v-model="categoryId" :style="{ background: catColour }">
          <option disabled value="">Select a category</option>
          <option
            v-for="category in categories"
            :value="category.id"
            :key="category.id"
          >
            {{ category.categoryName }}
          </option>
        </select>
        <button @click="addLongPrayer">
          <font-awesome-icon icon="plus" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import PrayerItem from "./PrayerItem.vue"
import CategoryManagement from "./CategoryManagement.vue"
import { mapState } from "vuex"

export default {
  name: "PrayerScreen",
  components: {
    PrayerItem,
    CategoryManagement,
  },
  data() {
    return {
      prayerName: "",
      prayerText: "",
      categoryId: "",
    }
  },
  computed: {
    ...mapState({
      statePrayers: (state) => state.prayers.prayers,
      sfPrayers: (state) => state.prayers.sfPrayers,
      categories: (state) => state.prayers.categories,
      sortOrder: (state) => state.prayers.sortHideOptions.sortOrder,
      sortCategory: (state) => state.prayers.sortHideOptions.sortCategory,
      hideAnswered: (state) => state.prayers.sortHideOptions.hideAnswered,
    }),
    prayers() {
      const hiddenCategoryIds = this.categories
        .filter((category) => !category.visible)
        .map((category) => category.id)

      return this.statePrayers
        .filter((a) => {
          return !this.hideAnswered || !a.answered
        })
        .filter((p) => !hiddenCategoryIds.includes(p.categoryId))
        .sort((a, b) =>
          this.sortPrayers(a, b, this.sortOrder, this.sortCategory)
        )
    },
    catColour() {
      if (this.categoryId) {
        const category = this.categories.find(
          (category) => category.id === this.categoryId
        )

        if (category) {
          return category.colour
        } else {
          return "none"
        }
      } else {
        return "none"
      }
    },
  },

  methods: {
    addPrayer() {
      this.$store.dispatch("prayers/addPrayer")
    },
    addLongPrayer() {
      this.$store.dispatch("prayers/addPrayer", {
        prayerName: this.prayerName,
        prayerText: this.prayerText,
        categoryId: this.categoryId,
      })
      this.prayerName = ""
      this.prayerText = ""
      this.categoryId = ""
    },
    changeSortCategory() {
      this.$store.dispatch("prayers/setSortCategory")
    },
    changeSortOrder() {
      this.$store.dispatch("prayers/setPrayerSortOrder")
    },
    toggleHideAnswered() {
      this.$store.dispatch("prayers/toggleShowAnswered")
    },
  },
  created: function () {
    this.$store.dispatch("prayers/getPrayersFromLocal")
  },
}
</script>
