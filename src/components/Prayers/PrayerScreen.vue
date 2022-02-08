<template>
  <div class="container flex flex-col items-center mx-auto">
    <h3 class="text-center">Prayers</h3>

    <div class="button-group">
      <button @click="changeSortCategory">{{ sortCategory }}</button>
      <button @click="changeSortOrder">{{ sortOrder }}</button>
      <button @click="toggleHideAnswered">
        {{ hideAnswered ? "Unhide Answered" : "Hide Answered" }}
      </button>
      <button @click="addPrayer">
        <font-awesome-icon icon="plus" />
      </button>
    </div>
    <div class="button-group"></div>
    <PrayerItem
      v-for="prayer in prayers"
      v-bind:key="prayer.id"
      v-bind="{ ...prayer }"
    />
  </div>
</template>

<script>
import PrayerItem from "./PrayerItem.vue";

export default {
  name: "PrayerScreen",
  components: {
    PrayerItem,
  },
  data() {
    return {
      sortOrder: "Descending",
      sortCategory: "Created Date",
      hideAnswered: false,
    };
  },
  computed: {
    prayers() {
      return this.$store.state.prayers.prayers
        ? [...this.$store.state.prayers.prayers]
            .filter((a) => {
              return !this.hideAnswered || !a.answered;
            })
            .sort((a, b) =>
              this.sortPrayers(a, b, this.sortOrder, this.sortCategory)
            )
        : [];
    },
  },

  methods: {
    addPrayer() {
      this.$store.dispatch("addPrayer");
    },
    changeSortCategory() {
      const options = [
        "Created Date",
        "Last Prayed",
        "Prayed Count",
        "Title",
        "Body",
        "Answered",
        "Random",
      ];
      const index = options.indexOf(this.sortCategory);
      const nextIndex = (index + 1) % options.length;
      this.sortCategory = options[nextIndex];
    },
    changeSortOrder() {
      this.sortOrder =
        this.sortOrder === "Ascending" ? "Descending" : "Ascending";
    },
    sortPrayers(a, b, sortOrder, sortCategory) {
      if (sortCategory === "Random") {
        return Math.random() - 0.5;
      }
      if (sortCategory === "Created Date") {
        return sortOrder === "Ascending"
          ? a.createdDate - b.createdDate
          : b.createdDate - a.createdDate;
      } else if (sortCategory === "Last Prayed") {
        return sortOrder === "Ascending"
          ? a.prayedDates.length === 0
            ? -1
            : a.prayedDates[a.prayedDates.length - 1] -
              b.prayedDates[b.prayedDates.length - 1]
          : b.prayedDates[b.prayedDates.length - 1] -
              a.prayedDates[a.prayedDates.length - 1];
      } else if (sortCategory === "Prayed Count") {
        return sortOrder === "Ascending"
          ? a.prayedDates.length - b.prayedDates.length > 0
            ? 1
            : -1
          : b.prayedDates.length - a.prayedDates.length > 0
          ? 1
          : -1;
      } else if (sortCategory === "Title") {
        return sortOrder === "Ascending"
          ? a.prayerName > b.prayerName
            ? 1
            : -1
          : b.prayerName > a.prayerName
          ? 1
          : -1;
      } else if (sortCategory === "Body") {
        return sortOrder === "Ascending"
          ? a.prayerText > b.prayerText
            ? 1
            : -1
          : b.prayerText > a.prayerText
          ? 1
          : -1;
      } else if (sortCategory === "Answered") {
        return sortOrder === "Ascending"
          ? a.answered === true
            ? 1
            : -1
          : b.answered === true
          ? 1
          : -1;
      }
    },
    toggleHideAnswered() {
      this.hideAnswered = !this.hideAnswered;
    },
  },
  created: function () {
    this.$store.dispatch("prayers/getPrayersFromLocal");
  },
};
</script>
