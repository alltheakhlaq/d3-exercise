import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import dataset from "./data.js";

console.log(dataset);
// dataset.data = array of data with shape: [date, value]

const dateToMillis = (date) => {
  return Date.parse(date);
};

const w = 500;
const h = 500;

const padding = 30;

const barWidth = w / dataset.data.length;

const xScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset.data, (d) => dateToMillis(d[0]))])
  .range([padding, w - padding]);

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset.data, (d) => d[1])])
  .range([h - padding, padding]);

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h)
  .append("g")
  .style("border-style", "solid");
// .attr("transform", "translate(" + padding + "," + padding + ")");
svg
  .selectAll("rect")
  .data(dataset.data)
  .enter()
  .append("rect")
  .attr("x", (d) => xScale(dateToMillis(d[0])))
  .attr("y", (d) => yScale(d[1]))
  .attr("width", barWidth)
  .attr("height", (d, i) => {
    return d[1];
  })
  .attr("class", "bar")
  .attr("fill", "grey");

// axis
let leftAxis = d3.axisLeft(yScale);
let bottomAxis = d3.axisBottom(xScale);
svg
  .append("g")
  .attr("id", "x-axis")
  .attr("transform", "translate(0," + (h - padding) + ")")
  .call(bottomAxis);

svg
  .append("g")
  .attr("id", "y-axis")
  .attr("transform", "translate(" + padding + ", 0)")
  .call(leftAxis);

svg.select("x-axis").attr("class", "tick");
svg.select("y-axis").attr("class", "tick");
