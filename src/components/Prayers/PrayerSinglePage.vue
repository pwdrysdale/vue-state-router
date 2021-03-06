<template>
  <div
    class="container flex flex-col items-end justify-between gap-4 py-1 mx-auto my-1 border-b-2 border-gray-800 space-between"
  >
    <div class="flex flex-col self-start flex-1 w-full">
      <input
        v-model="nameModel"
        class="h-full font-bold"
        placeholder="Add a title to your prayer"
      />
      <div class="w-full">
        <textarea-autosize
          v-model="textModel"
          rows="1"
          autosize
          placeholder="Add a body to your prayer"
          class="w-full h-full"
        />
      </div>
    </div>
    <div class="flex flex-col items-end justify-end">
      <div class="flex flex-col text-right small-text">
        {{
          id &&
          (lastPrayedDate === null
            ? "Not yet prayed"
            : "Prayed " +
              this.prayer.prayedDates.length +
              " time" +
              (this.prayer.prayedDates.length === 1 ? "" : "s"))
        }}
        <br v-if="lastPrayedDate" />
        {{ lastPrayedDate && "Last time " + lastPrayedDate }}
      </div>
      <div class="button-group">
        <select
          v-model="categoryModel"
          :style="{
            background: categoryModel ? categoryModel.colour : 'inherit',
          }"
        >
          <option value="">Select a category</option>
          <option
            v-for="category in categories"
            :value="category"
            :key="category.id"
          >
            {{ category.categoryName }}
          </option>
        </select>
        <button @click="prayed">
          <font-awesome-icon icon="pray" />
        </button>

        <button
          @click="setAsAnswered"
          :class="prayer.answered && 'bg-green-800 hover:bg-green-500'"
        >
          <font-awesome-icon icon="check" />
        </button>
        <button @click="removePrayer">
          <font-awesome-icon icon="trash" />
        </button>
      </div>
      <div class="button-group">
        <router-link :to="{ name: 'Prayer', params: { id: previousId } }">
          <button>
            <font-awesome-icon icon="angle-left" />
          </button>
        </router-link>
        <router-link :to="{ name: 'Prayer', params: { id: nextId } }">
          <button>
            <font-awesome-icon icon="angle-right" />
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { mapState } from "vuex"

dayjs.extend(relativeTime)

export default {
  name: "PrayerSinglePage",
  data() {
    return {
      id: null,
      nextId: null,
      previousId: null,
    }
  },

  computed: {
    ...mapState({
      categories: (state) => state.prayers.categories,
      sfPrayers: (state) => state.prayers.sfPrayers,
    }),
    prayer() {
      return this.sfPrayers.find(
        (prayer) => prayer.id === this.id || prayer.id === this.$route.params.id
      )
    },
    nameModel: {
      get() {
        return this.prayer.prayerName
      },
      set(name) {
        this.$store.dispatch("prayers/setPrayerName", { id: this.id, name })
      },
    },
    textModel: {
      get() {
        return this.prayer.prayerText
      },
      set(text) {
        this.$store.dispatch("prayers/setPrayerText", { id: this.id, text })
      },
    },
    lastPrayedDate: {
      get() {
        return this.prayer.prayedDates.length > 0
          ? dayjs(this.prayer.prayedDates[this.prayer.prayedDates.length - 1])
              .startOf("minute")
              .fromNow()
          : null
      },
    },
    categoryModel: {
      get() {
        return this.categories.find(
          (category) => category.id === this.prayer.categoryId
        )
      },
      set(category) {
        this.$store.dispatch("prayers/setPrayerCategory", {
          id: this.id,
          categoryId: category.id,
        })
      },
    },
  },
  methods: {
    removePrayer() {
      this.$store.dispatch("prayers/removePrayer", this.id)
    },
    prayed() {
      this.$store.dispatch("prayers/addPrayerDate", this.id)
    },
    setAsAnswered() {
      this.$store.dispatch("prayers/setPrayerAnswered", this.id)
    },
  },

  async created() {
    const id = this.$route.params.id
    this.id = id

    if (this.sfPrayers.length === 0) {
      await this.$store.dispatch("prayers/getPrayersFromLocal")
    }

    const sfPrayers = this.sfPrayers

    const nextIdx = sfPrayers.findIndex((prayer) => prayer.id === id) + 1
    this.nextId =
      nextIdx < sfPrayers.length ? sfPrayers[nextIdx].id : sfPrayers[0].id

    const previousIdx = sfPrayers.findIndex((prayer) => prayer.id === id) - 1
    this.previousId =
      previousIdx >= 0
        ? sfPrayers[previousIdx].id
        : sfPrayers[sfPrayers.length - 1].id
  },
}
</script>
