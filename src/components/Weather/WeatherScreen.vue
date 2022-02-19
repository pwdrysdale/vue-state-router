<template>
  <div class="container flex flex-col items-center mx-auto">
    <h3 class="text-center">
      Current Weather<span v-if="this.returnedLocation.name">
        for {{ this.returnedLocation.name }}</span
      >
    </h3>
    <div class="items-center button-group">
      <label for="apiKey">API Key: </label>
      <input v-model="apiModel" id="apiKey" />
      <label for="location">Location: </label>
      <input v-model="locationModel" id="location" />
      <button @click="toggleUnits">{{ this.weatherPrefs.units }}</button>
    </div>
    <button @click="getCurrent" class="mx-auto">Get Weather</button>
    <div class="flex flex-col gap-2 py-2">
      <div v-if="this.returnedLocation.name" class="flex flex-col items-center">
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
      <div v-if="this.returnedLocation.name" class="flex flex-col items-center">
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
            this.weather.wind_degree +
            " degrees (" +
            this.weather.wind_dir +
            ")"
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
      <div v-if="this.returnedLocation.name" class="flex flex-col items-center">
        <h3>Forecast</h3>
        <div v-for="(fcDay, idx) of this.forecast.forecastday" :key="idx">
          {{
            idx === 0
              ? "Today"
              : idx === 1
              ? "Tomorrow"
              : day(fcDay.date_epoch, this.current.tz_id)
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)

import { mapState } from "vuex"

export default {
  name: "WeatherScreen",
  data: function () {
    return {
      apiKey: "",
      returnedLocation: {},
    }
  },
  computed: {
    ...mapState(["weatherPrefs"]),

    apiModel: {
      get() {
        return this.$store.state.weatherPrefs.apiKey
      },
      set(apiKey) {
        this.$store.dispatch("weatherPrefs/setApiKey", apiKey)
      },
    },
    locationModel: {
      get() {
        return this.$store.state.weatherPrefs.location
      },
      set(location) {
        this.$store.dispatch("weatherPrefs/setLocation", location)
        // this.weatherPrefs.location = location;
      },
    },
  },

  methods: {
    toggleUnits() {
      this.$store.dispatch("weatherPrefs/toggleUnits")
    },
    day(dateEpoch, timezone) {
      return dayjs.utc(dateEpoch, timezone).format("dddd")
    },

    async getCurrent() {
      try {
        // const { data } = await axios.get(
        //   "http://api.weatherapi.com/v1/current.json?key=" +
        //     this.weatherPrefs.apiKey +
        //     "&q=" +
        //     this.weatherPrefs.location
        // )
        const { data } = await axios.get(
          "http://api.weatherapi.com/v1/forecast.json?key=" +
            this.weatherPrefs.apiKey +
            "&q=" +
            this.weatherPrefs.location +
            "&days=9"
        )
        console.log(data)
        const m = dayjs
          .utc(data.location.localtime, data.location.tz_id)
          .format("MMMM Do YYYY, h:mm a")

        this.returnedLocation = {
          ...data.location,
          localtime: m,
        }
        this.weather = data.current

        this.forecast = data.forecast
      } catch (e) {
        console.log(e)
      }
    },
    // async method to get current weather
  },
  created() {
    this.$store.dispatch("weatherPrefs/loadWeatherPrefs")
    if (this.weatherPrefs.apiKey !== "") {
      this.getCurrent()
    }
  },
}
</script>
