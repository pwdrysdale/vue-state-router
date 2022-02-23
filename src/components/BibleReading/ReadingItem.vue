<template>
  <div class="py-2 my-2 border-b-2 border-gray-800">
    <h3>Day {{ day.day }}</h3>
    <div class="button-group">
      <button
        v-for="(passage, index) in day.readings"
        :key="index"
        @click="goToLink(passage[0], passage[1])"
      >
        {{ passage[0] + " " + passage[1] }}
      </button>
    </div>
    <ReflectionItem
      v-for="ref of day.reflections"
      :key="ref.id"
      v-bind="{ ...ref, parentId: day.id }"
    />

    <div class="flex flex-col items-center gap-2 mx-auto">
      <div class="items-center button-group">
        <button @click="addReflection">
          <font-awesome-icon icon="plus" />
        </button>
        <ToggleButton
          :checked="day.completedDate ? true : false"
          :toggleFn="toggleCompleted"
        />
      </div>
      <span v-if="day.completedDate" class="small-text">
        completed {{ this.formattedCompletedDate }}
      </span>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import ReflectionItem from "./ReflectionItem.vue"
import ToggleButton from "../ToggleButton.vue"

dayjs.extend(relativeTime)

export default {
  name: "ReadingItem",
  components: {
    ReflectionItem,
    ToggleButton,
  },
  props: {
    day: {
      id: String,
      day: Number,
      readings: Array,
      completedDate: Date | null,
      reflections: Array,
    },
  },
  computed: {
    formattedCompletedDate() {
      if (this.day.completedDate) {
        return dayjs(this.day.completedDate).fromNow()
      }
      return ""
    },
  },
  methods: {
    goToLink(book, verse) {
      window.location.href = "https://www.esv.org/" + book + "+" + verse
    },
    addReflection() {
      this.$store.dispatch("readings/addReflection", this.day.id)
    },
    toggleCompleted() {
      if (this.day.completedDate) {
        this.removeCompletedDate()
      } else {
        this.setCompletedDate()
      }
    },
    setCompletedDate() {
      this.$store.dispatch("readings/setCompletedDate", this.day.id)
    },
    removeCompletedDate() {
      this.$store.dispatch("readings/removeCompletedDate", this.day.id)
    },
  },
}
</script>
