<template>
  <div>
    <h3>
      Current Weather<span v-if="this.returnedLocation.name">
        for {{ this.returnedLocation.name }}</span
      >
    </h3>
    <label for="apiKey">API Key: </label>
    <input v-model="apiModel" id="apiKey" />
    <label for="location">Location: </label>
    <input v-model="locationModel" id="location" />
    <button @click="toggleUnits">{{ this.weatherPrefs.units }}</button>
    <button @click="getCurrent">Get Weather</button>
    <div v-if="this.returnedLocation.name">
      <h3>Location</h3>
      <p>
        {{ this.returnedLocation.name }}, {{ this.returnedLocation.region }},
        {{ this.returnedLocation.country }}
      </p>

      <p>Latitude: {{ this.returnedLocation.lat }}</p>
      <p>Longitude: {{ this.returnedLocation.lon }}</p>
      <p>
        Local Time:
        {{ this.returnedLocation.localtime }}
      </p>
      <p>Timezome: {{ this.returnedLocation.tz_id }}</p>
    </div>
    <div v-if="this.returnedLocation.name">
      <h3>Current Weather</h3>
      <p>
        Current Temperature:
        {{
          this.weatherPrefs.units === "Metric"
            ? this.weather.temp_c + "°C"
            : this.weather.temp_f + "°F"
        }}
      </p>
      <p>{{ this.weather.condition.text }}</p>

      <p>
        Feels Like:
        {{
          this.weatherPrefs.units === "Metric"
            ? this.weather.feelslike_c + "°C"
            : this.weather.feelslike_f + "°F"
        }}
      </p>
      <p>
        UV Index:
        {{ this.weather.uv }}
      </p>
      <p>Cloud Cover: {{ this.weather.cloud }}%</p>
      <p>Humidity: {{ this.weather.humidity }}%</p>
      <p>
        Wind Gusts:
        {{
          this.weatherPrefs.units === "Metric"
            ? this.weather.gust_kph + "kph"
            : this.weather.gust_mph + "mph"
        }}
      </p>

      <p>
        Wind Speed:
        {{
          this.weatherPrefs.units === "Metric"
            ? this.weather.wind_kph + " kph"
            : this.weather.wind_mph + " mph"
        }}
      </p>
      <p>
        Wind Direction:
        {{
          this.weather.wind_degree + " degrees (" + this.weather.wind_dir + ")"
        }}
      </p>
      <p>
        Pressure:
        {{
          this.weatherPrefs.units === "Metric"
            ? this.weather.pressure_mb + " mb"
            : this.weather.pressure_in + " in"
        }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import moment from "moment";
import moment from "moment-timezone";

export default {
  name: "WeatherScreen",
  data: function () {
    return {
      apiKey: "",
      weatherPrefs: {
        units: "Metric",
        location: "",
        apiKey: "",
      },
      returnedLocation: {},
    };
  },
  computed: {
    apiModel: {
      get() {
        return this.weatherPrefs.apiKey;
      },
      set(apiKey) {
        console.log(apiKey);
        this.weatherPrefs.apiKey = apiKey;
      },
    },
    locationModel: {
      get() {
        return this.weatherPrefs.location;
      },
      set(location) {
        this.weatherPrefs.location = location;
      },
    },
  },
  methods: {
    toggleUnits() {
      this.weatherPrefs.units =
        this.weatherPrefs.units === "Metric" ? "Imperial" : "Metric";
    },

    async getCurrent() {
      try {
        const { data } = await axios.get(
          "http://api.weatherapi.com/v1/current.json?key=" +
            this.weatherPrefs.apiKey +
            "&q=" +
            this.weatherPrefs.location
        );

        const m = moment
          .tz(data.location.localtime, data.location.tz_id)
          .format("MMMM Do YYYY, h:mm a");

        this.returnedLocation = {
          ...data.location,
          localtime: m,
        };
        this.weather = data.current;
      } catch (e) {
        console.log(e);
      }
    },
    // async method to get current weather
  },
};
</script>
