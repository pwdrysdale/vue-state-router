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
    <div class="grid w-full gap-4 lg:grid-cols-4">
      <div class="flex flex-col w-full lg:col-span-3">
        <PrayerItem
          v-for="prayer in prayers"
          v-bind:key="prayer.id"
          v-bind="{ ...prayer }"
        />
      </div>
      <CategoryManagement />
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
      sortOrder: "Descending",
      sortCategory: "Created Date",
      hideAnswered: false,
    }
  },
  computed: {
    ...mapState({
      statePrayers: (state) => state.prayers.prayers,
      categories: (state) => state.prayers.categories,
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
  },

  methods: {
    addPrayer() {
      this.$store.dispatch("prayers/addPrayer")
    },
    changeSortCategory() {
      const options = [
        "Created Date",
        "Last Prayed",
        "Prayed Count",
        "Title",
        "Body",
        "Answered",
        "Category",
        "Random",
      ]
      const index = options.indexOf(this.sortCategory)
      const nextIndex = (index + 1) % options.length
      this.sortCategory = options[nextIndex]
    },
    changeSortOrder() {
      this.sortOrder =
        this.sortOrder === "Ascending" ? "Descending" : "Ascending"
    },
    sortPrayers(a, b, sortOrder, sortCategory) {
      if (sortCategory === "Random") {
        return Math.random() - 0.5
      }
      if (sortCategory === "Created Date") {
        return sortOrder === "Ascending"
          ? a.createdDate - b.createdDate
          : b.createdDate - a.createdDate
      } else if (sortCategory === "Last Prayed") {
        return sortOrder === "Ascending"
          ? a.prayedDates.length === 0
            ? -1
            : a.prayedDates[a.prayedDates.length - 1] -
              b.prayedDates[b.prayedDates.length - 1]
          : b.prayedDates[b.prayedDates.length - 1] -
              a.prayedDates[a.prayedDates.length - 1]
      } else if (sortCategory === "Prayed Count") {
        return sortOrder === "Ascending"
          ? a.prayedDates.length - b.prayedDates.length > 0
            ? 1
            : -1
          : b.prayedDates.length - a.prayedDates.length > 0
          ? 1
          : -1
      } else if (sortCategory === "Title") {
        return sortOrder === "Ascending"
          ? a.prayerName > b.prayerName
            ? 1
            : -1
          : b.prayerName > a.prayerName
          ? 1
          : -1
      } else if (sortCategory === "Body") {
        return sortOrder === "Ascending"
          ? a.prayerText > b.prayerText
            ? 1
            : -1
          : b.prayerText > a.prayerText
          ? 1
          : -1
      } else if (sortCategory === "Category") {
        let aWeight = 0
        let bWeight = 0
        aWeight =
          this.categories.find((c) => c.id === a.categoryId)?.sortOrder || 0
        bWeight =
          this.categories.find((c) => c.id === b.categoryId)?.sortOrder || 0
        return sortOrder === "Ascending" ? aWeight - bWeight : bWeight - aWeight
      } else if (sortCategory === "Answered") {
        return sortOrder === "Ascending"
          ? a.answered === true
            ? 1
            : -1
          : b.answered === true
          ? 1
          : -1
      }
    },
    toggleHideAnswered() {
      this.hideAnswered = !this.hideAnswered
    },
  },
  created: function () {
    this.$store.dispatch("prayers/getPrayersFromLocal")
  },
}
</script>
