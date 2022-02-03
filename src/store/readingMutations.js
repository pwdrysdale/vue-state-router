import { v4 as uuid } from "uuid";

export default {
  loadReadings(state, readings) {
    state.reading = readings;
  },

  markReadingAsCompleted(state, id) {
    state.reading = state.reading.map((reading) => {
      if (reading.id === id) {
        return {
          ...reading,
          completedDate: new Date(),
          dateModified: new Date(),
        };
      } else {
        return reading;
      }
    });
  },

  addReflection(state, { id, reflection }) {
    state.reading = state.reading.map((reading) => {
      if (reading.id === id) {
        return {
          ...reading,
          reflections: [...reading.reflections, reflection],
        };
      } else {
        return reading;
      }
    });
  },

  removeReflection(state, { id, reflectionId }) {
    state.reading = state.reading.map((reading) => {
      if (reading.id === id) {
        return {
          ...reading,
          reflections: reading.reflections.filter(
            (reflection) => reflection.id !== reflectionId
          ),
        };
      } else {
        return reading;
      }
    });
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
              };
            } else {
              return reflection;
            }
          }),
        };
      } else {
        return reading;
      }
    });
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
              };
            } else {
              return reflection;
            }
          }),
        };
      } else {
        return reading;
      }
    });
  },

  resetCompleted(state) {
    state.reading = state.reading.map((reading) => {
      return {
        ...reading,
        completedDate: null,
        dateModified: new Date(),
      };
    });
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
      };
    });
  },

  removeCompletedDate(state, id) {
    state.reading = state.reading.map((reading) => {
      if (reading.id === id) {
        return {
          ...reading,
          completedDate: null,
          dateModified: new Date(),
        };
      } else {
        return reading;
      }
    });
  },
};
