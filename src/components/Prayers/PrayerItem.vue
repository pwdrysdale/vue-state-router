<template>
  <div
    class="container flex items-end justify-between gap-4 py-1 my-1 border-b-2 border-gray-800 space-between"
  >
    <div class="flex flex-col self-start flex-1">
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
      <div class="flex flex-col text-sm italic text-right text-gray-400">
        {{
          lastPrayedDate === null
            ? "Not yet prayed"
            : "Prayed " +
              prayedDates.length +
              " time" +
              (prayedDates.length === 1 ? "" : "s")
        }}
        <br v-if="lastPrayedDate" />
        {{ lastPrayedDate && "Last time " + lastPrayedDate }}
      </div>
      <div class="button-group">
        <button @click="prayed">
          <font-awesome-icon icon="pray" />
        </button>

        <button
          @click="setAsAnswered"
          :class="answered && 'bg-green-800 hover:bg-green-500'"
        >
          <font-awesome-icon icon="check" />
        </button>
        <button @click="removePrayer">
          <font-awesome-icon icon="trash" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "PrayerItem",
  props: {
    id: String,
    prayerName: String,
    prayerText: String,
    createdDate: Date,
    prayedDates: Array,
    answered: Boolean,
  },
  computed: {
    nameModel: {
      get() {
        return this.prayerName;
      },
      set(name) {
        this.$store.dispatch("setPrayerName", { id: this.id, name });
      },
    },
    textModel: {
      get() {
        return this.prayerText;
      },
      set(text) {
        // console.log("set text", text);
        this.$store.dispatch("setPrayerText", { id: this.id, text });
      },
    },
    lastPrayedDate: {
      get() {
        return this.prayedDates.length > 0
          ? moment(this.prayedDates[this.prayedDates.length - 1])
              .startOf("minute")
              .fromNow()
          : null;
      },
    },
  },
  methods: {
    removePrayer() {
      this.$store.dispatch("removePrayer", this.id);
    },
    prayed() {
      this.$store.dispatch("addPrayerDate", this.id);
    },
    setAsAnswered() {
      this.$store.dispatch("setPrayerAnswered", this.id);
    },
  },
};
</script>
