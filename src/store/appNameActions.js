export default {
  setName(context, name) {
    localStorage.setItem("name", name);
    context.commit("setName", name);
  },

  loadName(context) {
    const name = localStorage.getItem("name");

    context.commit("setName", name || "Toolkit");
  },
};
