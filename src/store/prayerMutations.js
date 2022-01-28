export default {
  loadPrayers(state, prayers) {
    state.prayers = prayers;
  },

  addPrayer(state, prayer) {
    state.prayers = [...state.prayers, prayer];
  },

  removePrayer(state, id) {
    state.prayers = state.prayers.filter((p) => p.id !== id);
  },

  setPrayerName(state, { id, name }) {
    state.prayers = state.prayers.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          prayerName: name,
        };
      } else {
        return p;
      }
    });
  },

  setPrayerText(state, { id, text }) {
    state.prayers = state.prayers.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          prayerText: text,
        };
      } else {
        return p;
      }
    });
  },

  addPrayerDate(state, id) {
    state.prayers = state.prayers.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          prayedDates: [...p.prayedDates, new Date()],
        };
      } else {
        return p;
      }
    });
  },

  markAsAnswered(state, id) {
    state.prayers = state.prayers.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          answered: !p.answered,
        };
      } else {
        return p;
      }
    });
  },
};
