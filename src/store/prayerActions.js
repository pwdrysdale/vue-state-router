import { v4 as uuid } from "uuid";

export default {
  setPrayersInLocal(context) {
    localStorage.setItem("vueprayers", JSON.stringify(context.state.prayers));
  },

  getPrayersFromLocal(context) {
    const prayers = localStorage.getItem("vueprayers");
    if (prayers) {
      const correctDates = JSON.parse(prayers).map((p) => {
        return {
          ...p,
          prayedDates: p.prayedDates.map((pd) => new Date(pd)),
          createdDate: new Date(p.createdDate),
        };
      });
      context.commit("loadPrayers", correctDates);
    } else {
      [
        {
          id: uuid(),
          prayerName: "",
          prayerText: "",
          createdDate: new Date(),
          prayedDates: [],
          answered: false,
        },
      ];
      context.commit("loadPrayers", prayers);
    }
  },

  addPrayer(context) {
    const prayer = {
      id: uuid(),
      prayerName: "",
      prayerText: "",
      createdDate: new Date(),
      prayedDates: [],
    };
    context.commit("addPrayer", prayer);
    context.dispatch("setPrayersInLocal");
  },

  removePrayer(context, id) {
    context.commit("removePrayer", id);
    context.dispatch("setPrayersInLocal");
  },

  setPrayerName(context, payload) {
    context.commit("setPrayerName", payload);
    context.dispatch("setPrayersInLocal");
  },

  setPrayerText(context, payload) {
    context.commit("setPrayerText", payload);
    context.dispatch("setPrayersInLocal");
  },

  addPrayerDate(context, id) {
    context.commit("addPrayerDate", id);
    context.dispatch("setPrayersInLocal");
  },

  setPrayerAnswered(context, id) {
    context.commit("markAsAnswered", id);
    context.dispatch("setPrayersInLocal");
  },
};
