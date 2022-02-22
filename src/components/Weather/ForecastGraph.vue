<template>
  <div>
    <h1>Data: {{ data[0].temp_c }}</h1>
    <div :id="'graph' + idx" />
  </div>
</template>

<script>
// import { v4 as uuid } from "uuid"
import * as d3 from "d3"

export default {
  name: "ForecastGraph",
  props: ["data", "units", "idx"],
  // plot the temp_c data
  mounted() {
    const graph = d3.select(`#graph${this.idx}`)
    const margin = { top: 20, right: 20, bottom: 30, left: 50 }
    const width =
      graph.node().getBoundingClientRect().width - margin.left - margin.right
    const height =
      graph.node().getBoundingClientRect().height - margin.top - margin.bottom
    const x = d3.scaleTime().range([0, width])
    const y = d3.scaleLinear().range([height, 0])
    const line = d3
      .line()
      .x((d) => x(d.time))
      .y((d) => y(d.temp_c))
    const svg = graph
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
    const data = this.data.map((d) => ({
      time: d.time,
      temp_c: d.temp_c,
    }))
    x.domain(d3.extent(data, (d) => d.time))
    y.domain(d3.extent(data, (d) => d.temp_c))
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call.append("text")
      .attr("fill", "#000")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")

    svg
      .append("g")
      .call(d3.axisLeft(y))
      .call((g) => g.select(".domain").remove())

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .call((g) => g.select(".domain").remove())

    // add the line to the graph
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line)
  },
}
</script>
