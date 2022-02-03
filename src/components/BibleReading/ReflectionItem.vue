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
import moment from "moment";

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
        return moment(this.dateModified).startOf("minute").fromNow();
      },
    },

    titleModel: {
      get() {
        return this.title;
      },
      set(title) {
        console.log("Called set title");
        this.$store.dispatch("setReflectionTitle", {
          reflectionId: this.id,
          id: this.parentId,
          title,
        });
      },
    },
    textModel: {
      get() {
        return this.text;
      },
      set(text) {
        console.log("Called set text");
        if (text !== this.text) {
          this.$store.dispatch("setReflectionText", {
            reflectionId: this.id,
            id: this.parentId,
            text,
          });
        }
      },
    },
  },
  methods: {
    removeReflection() {
      this.$store.dispatch("removeReflection", {
        id: this.parentId,
        reflectionId: this.id,
      });
    },
  },
};
</script>
