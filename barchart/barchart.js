import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import dataset from "./data.js";

console.log(dataset);
// dataset.data = array of data with shape: [date, value]

const w = 500;
const h = 500;

const padding = 30;
const xScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset.data, (d) => d[0])])
  .range([padding, w - padding]);

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset.data, (d) => d[1])])
  .range([h - padding, padding]);

const svg = d3.select("body").append("svg").attr("width", w).attr("height", h);
svg
  .selectAll("rect")
  .data(dataset.data)
  .enter()
  .append("rect")
  .attr("x", (d) => xScale(d[0]))
  .attr("y", (d) => yScale(d[1]))
  .attr("width", 25)
  .attr("height", (d, i) => {
    return d[1];
  })
  .attr("class", "bar")
  .attr("fill", "grey");
