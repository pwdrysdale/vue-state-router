<template>
  <div v-if="this.fcDay.date_epoch" class="flex flex-col items-center">
    <h3>
      {{
        index === 0
          ? "Today"
          : index === 1
          ? "Tomorrow"
          : day(fcDay.date_epoch, tz_id)
      }}
    </h3>
    <p>Condition: {{ fcDay.day.condition.text }}</p>
    <p>
      Min Temp:
      {{
        units === "Metric"
          ? fcDay.day.mintemp_c + "°C"
          : fcDay.day.mintemp_f + "°F"
      }}
    </p>
    <p>
      Max Temp:
      {{
        units === "Metric"
          ? fcDay.day.maxtemp_c + "°C"
          : fcDay.day.maxtemp_f + "°F"
      }}
    </p>
    <p>
      Avg Temp:
      {{
        units === "Metric"
          ? fcDay.day.avgtemp_c + "°C"
          : fcDay.day.avgtemp_f + "°F"
      }}
    </p>
    <p>
      Avg Humidity:
      {{ fcDay.day.avghumidity }}%
    </p>

    <p>
      Chance of Rain:
      {{ fcDay.day.daily_chance_of_rain }}%
    </p>
    <p>
      Chance of Snow:
      {{ fcDay.day.daily_chance_of_snow }}%
    </p>
    <p>
      Maximum Wind Speed:
      {{
        units === "Metric"
          ? fcDay.day.maxwind_kph + " kph"
          : fcDay.day.maxwind_mph + " mph"
      }}
    </p>
    <p>
      Visibility:
      {{
        units === "Metric"
          ? fcDay.day.avgvis_km + "km"
          : fcDay.day.avgvis_miles + "mi"
      }}
    </p>
    <p>
      UV Index:
      {{ fcDay.day.uv }}
    </p>
    <p>
      Sunrise:
      {{ fcDay.astro.sunrise }}
    </p>
    <p>
      Sunset:
      {{ fcDay.astro.sunset }}
    </p>
    <p>
      Moonrise:
      {{ fcDay.astro.moonrise }}
    </p>
    <p>
      Moonset:
      {{ fcDay.astro.moonset }}
    </p>
    <p>
      Moon Phase:
      {{ fcDay.astro.moon_phase }}
    </p>
    <p>
      Moon Illumination
      {{ fcDay.astro.moon_illumination }}%
    </p>
    <ForecastGraph :data="fcDay.hour" :units="units" :idx="index" />
  </div>
  <div v-else>
    <h3>Awaiting Data</h3>
  </div>
</template>

<script>
import ForecastGraph from "./ForecastGraph.vue"

import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(utc)
dayjs.extend(timezone)

export default {
  name: "ForecastDay",
  components: {
    ForecastGraph,
  },
  props: ["units", "fcDay", "index", "tz_id"],
  methods: {
    day(dateEpoch, timezone) {
      return dayjs.unix(dateEpoch).add(1, "day").utc(timezone).format("dddd")
    },
  },
}
</script>
