export const namespaced = true;

export const state = {
  name: "Pete's Toolkit Store",
};

export const actions = {
  setName({ commit }, name) {
    localStorage.setItem("name", name);
    commit("SET_NAME", name);
  },

  loadName({ commit }) {
    const name = localStorage.getItem("name");
    commit("SET_NAME", name || "Toolkit");
  },
};

export const mutations = {
  SET_NAME(state, name) {
    state.name = name;
  },
};
