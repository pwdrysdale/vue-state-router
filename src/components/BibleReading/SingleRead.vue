<template>
  <div
    class="container py-2 mx-auto my-2 border-b-2 border-gray-800"
    v-if="this.day > 0"
  >
    <h3>Day {{ day }}</h3>
    <div class="button-group">
      <button
        v-for="(passage, index) in readings"
        :key="index"
        @click="goToLink(passage[0], passage[1])"
      >
        {{ passage[0] + " " + passage[1] }}
      </button>
    </div>
    <ReflectionItem
      v-for="ref of reflections"
      :key="ref.id"
      v-bind="{ ...ref, parentId: id }"
    />

    <div class="flex flex-col items-center gap-2 mx-auto">
      <div class="items-center button-group">
        <button @click="addReflection">
          <font-awesome-icon icon="plus" />
        </button>
        <ToggleButton
          :checked="completedDate ? true : false"
          :toggleFn="toggleCompleted"
        />
      </div>
      <span v-if="completedDate" class="small-text">
        completed {{ this.formattedCompletedDate }}
      </span>
    </div>
    <div class="button-group">
      <router-link
        :to="{
          name: 'Reading',
          params: { day: ((((day - 2) % 365) + 365) % 365) + 1 },
        }"
      >
        <button>Previous</button>
      </router-link>
      <router-link :to="{ name: 'Reading', params: { day: (day % 365) + 1 } }">
        <button>Next</button>
      </router-link>
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
  name: "ReadingSingle",
  components: {
    ReflectionItem,
    ToggleButton,
  },
  data() {
    return {
      id: "",
      day: "",
      readings: "",
      completedDate: "",
      reflections: [],
    }
  },
  computed: {
    formattedCompletedDate() {
      if (this.completedDate) {
        return dayjs(this.completedDate).fromNow()
      }
      return ""
    },
  },
  methods: {
    goToLink(book, verse) {
      window.location.href = "https://www.esv.org/" + book + "+" + verse
    },
    addReflection() {
      this.$store.dispatch("readings/addReflection", this.id)
    },
    toggleCompleted() {
      if (this.completedDate) {
        this.removeCompletedDate()
      } else {
        this.setCompletedDate()
      }
    },
    setCompletedDate() {
      this.$store.dispatch("readings/setCompletedDate", this.id)
    },
    removeCompletedDate() {
      this.$store.dispatch("readings/removeCompletedDate", this.id)
    },
  },
  created() {
    const day = parseInt(this.$route.params.day, 10)

    if (
      this.$store.state.readings &&
      this.$store.state.readings.reading.length !== 1
    ) {
      this.$store.dispatch("readings/getReadingsFromLocal")
    }

    this.$store.state.readings.reading.forEach((reading) => {
      if (reading.day === day) {
        this.id = reading.id
        this.day = reading.day
        this.readings = reading.readings
        this.completedDate = reading.completedDate
        this.reflections = reading.reflections
      }
    })
  },
}
</script>
