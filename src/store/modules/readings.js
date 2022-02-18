import { v4 as uuid } from "uuid"

import plan from "../../components/BibleReading/plan.json"

export const namespaced = true

export const state = {
  reading: [],
}

export const actions = {
  // set readings in local storage
  setReadingsInLocal(context) {
    localStorage.setItem("readings", JSON.stringify(context.state.reading))
  },

  // get readings from local storage
  getReadingsFromLocal(context) {
    console.log("getting readings from local storage")
    const readings = localStorage.getItem("readings")

    if (readings && readings.length > 0) {
      console.log("Found readings in local storage")
      const correctDates = JSON.parse(readings).map((r) => {
        return {
          ...r,
          completedDate: r.completedDate ? new Date(r.completedDate) : null,
          reflections: r.reflections.map((ref) => {
            return {
              ...ref,
              dateCreated: new Date(ref.dateCreated),
              dateModified: new Date(ref.dateModified),
            }
          }),
        }
      })
      context.commit("loadReadings", correctDates)
    } else {
      const newPlan = Object.keys(plan).map((key, idx) => {
        return {
          id: key,
          day: idx + 1,
          readings: plan[key],
          completedDate: null,
          reflections: [
            {
              id: uuid(),
              title: "",
              text: "",
              dateCreated: new Date(),
              dateModified: new Date(),
            },
          ],
        }
      })
      // console.log(newPlan);
      context.commit("loadReadings", newPlan)
    }
  },

  addReflection(context, id) {
    console.log("adding reflection")
    const reflection = {
      id: uuid(),
      title: "",
      text: "",
      dateCreated: new Date(),
      dateModified: new Date(),
    }
    context.commit("addReflection", { id, reflection })
    context.dispatch("setReadingsInLocal")
  },

  removeReflection(context, { id, reflectionId }) {
    context.dispatch("addToasts", {
      text: "Reflection removed",
      type: "warning",
    })
    context.commit("removeReflection", { id, reflectionId })
    context.dispatch("setReadingsInLocal")
  },

  setReflectionTitle(context, { id, reflectionId, title }) {
    console.log("setting reflection title")
    context.commit("setReflectionTitle", { id, reflectionId, title })
    context.dispatch("setReadingsInLocal")
  },

  setReflectionText(context, { id, reflectionId, text }) {
    context.commit("setReflectionText", { id, reflectionId, text })
    context.dispatch("setReadingsInLocal")
  },

  setCompletedDate(context, id) {
    const textOptions = [
      "You're doing great!",
      "Well done!",
      "He is faithful!",
      "The Lord bless you and keep you!",
      "The grace of our Lord Jesus Christ be with your spirit, brothers.",
      "To the King of ages, immortal, invisible, the only God, be honor and glory forever and ever.",
    ]

    const text = textOptions[Math.floor(Math.random() * textOptions.length)]

    context.dispatch("addToasts", {
      text,
      type: "success",
    })
    context.commit("markReadingAsCompleted", id)
    context.dispatch("setReadingsInLocal")
  },

  resetCompleted(context) {
    // how many readings are completed?
    const completedReadings = context.state.reading.filter(
      (r) => r.completedDate
    ).length

    if (completedReadings === 365) {
      context.dispatch("addToasts", {
        text: "You've done great! Let's to it again!",
        type: "success",
      })
    } else {
      context.dispatch("addToasts", {
        text: "Let's go!",
        type: "success",
      })
    }
    context.commit("resetCompleted")
    context.dispatch("setReadingsInLocal")
  },

  resetReflections(context) {
    context.dispatch("addToasts", {
      text: "Fresh start!",
      type: "success",
    })
    context.commit("resetReflections")
    context.dispatch("setReadingsInLocal")
  },

  removeCompletedDate(context, id) {
    context.dispatch("addToasts", {
      text: "Back to incomplete it is!",
      type: "warning",
    })
    context.commit("removeCompletedDate", id)
    context.dispatch("setReadingsInLocal")
  },
}

export const mutations = {
  loadReadings(state, readings) {
    state.reading = readings
  },

  markReadingAsCompleted(state, id) {
    state.reading = state.reading.map((reading) => {
      if (reading.id === id) {
        return {
          ...reading,
          completedDate: new Date(),
          dateModified: new Date(),
        }
      } else {
        return reading
      }
    })
  },

  addReflection(state, { id, reflection }) {
    state.reading = state.reading.map((reading) => {
      if (reading.id === id) {
        return {
          ...reading,
          reflections: [...reading.reflections, reflection],
        }
      } else {
        return reading
      }
    })
  },

  removeReflection(state, { id, reflectionId }) {
    state.reading = state.reading.map((reading) => {
      if (reading.id === id) {
        return {
          ...reading,
          reflections: reading.reflections.filter(
            (reflection) => reflection.id !== reflectionId
          ),
        }
      } else {
        return reading
      }
    })
  },

  setReflectionTitle(state, { id, reflectionId, title }) {
    state.reading = state.reading.map((reading) => {
      if (reading.id === id) {
        return {
          ...reading,
          reflections: reading.reflections.map((reflection) => {
            if (reflection.id === reflectionId) {
              return {
                ...reflection,
                dateModified: new Date(),
                title,
              }
            } else {
              return reflection
            }
          }),
        }
      } else {
        return reading
      }
    })
  },

  setReflectionText(state, { id, reflectionId, text }) {
    state.reading = state.reading.map((reading) => {
      if (reading.id === id) {
        return {
          ...reading,
          reflections: reading.reflections.map((reflection) => {
            if (reflection.id === reflectionId) {
              return {
                ...reflection,
                dateModified: new Date(),
                text,
              }
            } else {
              return reflection
            }
          }),
        }
      } else {
        return reading
      }
    })
  },

  resetCompleted(state) {
    state.reading = state.reading.map((reading) => {
      return {
        ...reading,
        completedDate: null,
        dateModified: new Date(),
      }
    })
  },

  resetReflections(state) {
    state.reading = state.reading.map((reading) => {
      return {
        ...reading,
        reflections: [
          {
            id: uuid(),
            title: "",
            text: "",
            dateCreated: new Date(),
            dateModified: new Date(),
          },
        ],
      }
    })
  },

  removeCompletedDate(state, id) {
    state.reading = state.reading.map((reading) => {
      if (reading.id === id) {
        return {
          ...reading,
          completedDate: null,
          dateModified: new Date(),
        }
      } else {
        return reading
      }
    })
  },
}
