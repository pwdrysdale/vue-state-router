<template>
  <div class="flex w-full gap-2">
    <div class="flex-1">
      <input
        placeholder="Reflection title"
        class="w-full font-bold"
        v-model="titleModel"
      />
      <textarea-autosize
        autosize
        rows="5"
        placeholder="Reflections"
        class="w-full"
        v-model="textModel"
      />
      <div class="flex flex-col items-end justify-center gap-2">
        <div class="small-text">updated {{ modifiedDate }}</div>
        <button @click="removeReflection">
          <font-awesome-icon icon="trash" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

export default {
  name: "ReflectionItem",
  props: {
    id: String,
    title: String,
    text: String,
    createdDate: Date,
    dateModified: Date,
    parentId: String,
  },
  computed: {
    modifiedDate: {
      get() {
        return dayjs(this.dateModified).startOf("minute").fromNow()
      },
    },

    titleModel: {
      get() {
        return this.title
      },
      set(title) {
        this.$store.dispatch("readings/setReflectionTitle", {
          reflectionId: this.id,
          id: this.parentId,
          title,
        })
      },
    },
    textModel: {
      get() {
        return this.text
      },
      set(text) {
        if (text !== this.text) {
          this.$store.dispatch("readings/setReflectionText", {
            reflectionId: this.id,
            id: this.parentId,
            text,
          })
        }
      },
    },
  },
  methods: {
    removeReflection() {
      this.$store.dispatch("readings/removeReflection", {
        id: this.parentId,
        reflectionId: this.id,
      })
    },
  },
}
</script>
