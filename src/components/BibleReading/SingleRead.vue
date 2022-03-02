<template>
  <div class="container py-2 mx-auto my-2 border-b-2 border-gray-800">
    <h3>Day {{ day.day }}</h3>
    <div class="button-group">
      <button
        v-for="(passage, index) in day.readings"
        :key="index"
        @click="goToLink(day.passage[0], day.passage[1])"
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
        <ToggleButton :checked="checked" :toggleFn="toggleCompleted" />
      </div>
      <span v-if="day.completedDate" class="small-text">
        completed {{ this.formattedCompletedDate }}
      </span>
    </div>
    <div class="button-group">
      <router-link
        :to="{
          name: 'Reading',
          params: { day: ((((day.day - 2) % 365) + 365) % 365) + 1 },
        }"
      >
        <button>Previous</button>
      </router-link>
      <router-link
        :to="{ name: 'Reading', params: { day: (day.day % 365) + 1 } }"
      >
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
import { mapState } from "vuex"

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
    }
  },
  computed: {
    ...mapState({
      readings: (state) => state.readings.reading,
    }),
    day() {
      return this.readings.find((day) => day.day === (this ? this.id : 365))
    },
    checked() {
      return this.day.completedDate ? true : false
    },
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
  created() {
    this.id = parseInt(this.$route.params.day, 10)

    if (
      this.$store.state.readings &&
      this.$store.state.readings.reading.length !== 1
    ) {
      this.$store.dispatch("readings/getReadingsFromLocal")
    }
  },
}
</script>
