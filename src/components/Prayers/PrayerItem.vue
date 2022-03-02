<template>
  <div
    class="container flex flex-col items-end justify-between gap-4 py-1 my-1 border-b-2 border-gray-800 space-between"
  >
    <div class="flex flex-col self-start w-full">
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
              prayedDates.length +
              " time" +
              (prayedDates.length === 1 ? "" : "s"))
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
          :class="answered && 'bg-green-800 hover:bg-green-500'"
        >
          <font-awesome-icon icon="check" />
        </button>
        <router-link :to="{ name: 'Prayer', params: { id } }">
          <button>
            <font-awesome-icon icon="eye" />
          </button>
        </router-link>
        <button @click="removePrayer">
          <font-awesome-icon icon="trash" />
        </button>
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
  name: "PrayerItem",
  props: {
    id: String,
    prayerName: String,
    prayerText: String,
    createdDate: Date,
    prayedDates: Array[Date],
    answered: Boolean,
    categoryId: String,
  },

  computed: {
    ...mapState({
      categories: (state) => state.prayers.categories,
    }),
    nameModel: {
      get() {
        return this.prayerName || ""
      },
      set(name) {
        this.$store.dispatch("prayers/setPrayerName", { id: this.id, name })
      },
    },
    textModel: {
      get() {
        return this.prayerText || ""
      },
      set(text) {
        this.$store.dispatch("prayers/setPrayerText", { id: this.id, text })
      },
    },
    categoryModel: {
      get() {
        return this.categories.find(
          (category) => category.id === this.categoryId
        )
      },
      set(category) {
        console.log(category)
        this.$store.dispatch("prayers/setPrayerCategory", {
          id: this.id,
          categoryId: category.id,
        })
      },
    },
    lastPrayedDate: {
      get() {
        return this.prayedDates.length > 0
          ? dayjs(this.prayedDates[this.prayedDates.length - 1])
              .startOf("minute")
              .fromNow()
          : null
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
}
</script>
