export const namespaced = true;

export const state = {
  units: "Metric",
  apiKey: "",
  location: "",
};

export const mutations = {
  SET_WEATHER_PREFS(state, payload) {
    state = payload;
  },
  TOGGLE_UNITS(state, units) {
    state.units = units;
  },
  SET_API_KEY(state, apiKey) {
    state.apiKey = apiKey;
  },
  SET_LOCATION(state, location) {
    state.location = location;
  },
};

export const actions = {
  saveWeatherPrefs() {
    localStorage.setItem(
      "weatherPrefs",
      JSON.stringify(this.state.weatherPrefs)
    );
  },
  loadWeatherPrefs({ commit }) {
    const weatherPrefs = JSON.parse(localStorage.getItem("weatherPrefs"));
    if (weatherPrefs) {
      commit("SET_WEATHER_PREFS", weatherPrefs);
    }
  },
  toggleUnits({ commit, dispatch }) {
    commit("TOGGLE_UNITS");
    dispatch("saveWeatherPrefs");
  },
  setApiKey({ commit, dispatch }, apiKey) {
    commit("SET_API_KEY", apiKey);
    dispatch("saveWeatherPrefs");
  },
  setLocation({ commit, dispatch }, location) {
    commit("SET_LOCATION", location);
    dispatch("saveWeatherPrefs");
  },
};

export const getters = {};
