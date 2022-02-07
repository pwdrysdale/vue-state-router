<template>
  <div>
    <h1>This is the weather</h1>
    <label for="apiKey">API Key: </label>
    <input v-model="apiModel" id="apiKey" />
    <label for="location">Location: </label>
    <input v-model="locationModel" id="location" />
    <button @click="getCurrent">Get Weather</button>
    <div>
      <h3>Location</h3>
      <p>{{ this.returnedLocation.name }}</p>
      <p>{{ this.returnedLocation.region }}</p>
      <p>{{ this.returnedLocation.country }}</p>
      <p>{{ this.returnedLocation.lat }}</p>
      <p>{{ this.returnedLocation.lon }}</p>
      <p>{{ this.returnedLocation.localTime }}</p>
      <p>{{ this.returnedLocation.tz_id }}</p>
    </div>
    <div>
      <h3>Current Weather</h3>
      {{ this.weather.temp_c }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "WeatherScreen",
  data: function () {
    return {
      apiKey: "",
      location: "",
      weather: {},
      returnedLocation: {},
    };
  },
  computed: {
    apiModel: {
      get() {
        return this.apiKey;
      },
      set(apiKey) {
        console.log(apiKey);
        this.apiKey = apiKey;
      },
    },
    locationModel: {
      get() {
        return this.location;
      },
      set(location) {
        this.location = location;
      },
    },
  },
  methods: {
    async getCurrent() {
      console.log(this.apiKey);
      const { data } = await axios.get(
        "http://api.weatherapi.com/v1/current.json?key=" +
          this.apiKey +
          "&q=" +
          this.location
      );
      console.log(data);
      this.returnedLocation = data.location;
      this.weather = data.current;
      console.log(this.returnedLocation);
    },
    // async method to get current weather
  },
};
</script>
