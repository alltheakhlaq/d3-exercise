import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import dataset from "./data.js";

console.log(dataset);
// dataset.data = array of data with shape: [date, value]

const parseDate = d3.utcParse("%Y-%m-%d");
const dateToMillis = (date) => {
  return parseDate(date);
};

const w = 1000;
const h = 500;

const padding = 40;

const barWidth = (w - padding - padding) / dataset.data.length;

const xScale = d3
  .scaleTime()
  .domain([
    d3.min(dataset.data, (d) => dateToMillis(d[0])),
    d3.max(dataset.data, (d) => dateToMillis(d[0])),
  ])
  .range([padding, w - padding]);

const yScale = d3
  .scaleLinear()
  .domain([
    d3.min(dataset.data, ([_, value]) => value),
    d3.max(dataset.data, ([_, value]) => value),
  ])
  .range([h - padding, padding]);

// axis
let leftAxis = d3.axisLeft(yScale);
let bottomAxis = d3.axisBottom(xScale);

// create a tooltip
var Tooltip = d3
  .selectAll("bar")
  .data(dataset.data)
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("position", "absolute")
  .style("border", "solid")
  .style("border-width", "2px")
  .style("border-radius", "5px")
  .style("padding", "5px");

// Three function that change the tooltip when user hover / move / leave a cell
var mouseover = function (d) {
  Tooltip.style("opacity", 1);
  d3.select(".tooltip").style("stroke", "black").style("opacity", 1);
};
var mousemove = function (d) {
  d3.select("#tooltip")
    .style("left", d3.event.pageX + 10 + "px")
    .style("top", d3.event.pageY + 10 + "px");
};
var mouseleave = function (d) {
  Tooltip.style("opacity", 0);
  d3.select(".tooltip").style("stroke", "none").style("opacity", 0.8);
};

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h)
  .style("border-style", "solid");

svg
  .selectAll("#title")
  .data(dataset.data)
  .enter()
  .append("rect")
  .attr("x", (d) => xScale(dateToMillis(d[0])))
  .attr("y", (d) => yScale(d[1]))
  .attr("width", barWidth)
  .attr("height", (d) => h - padding - yScale(d[1]))
  .attr("class", "bar")
  .attr("fill", "grey")
  .append("title")
  .on("mouseover", mouseover)
  .on("mousemove", mousemove)
  .on("mouseleave", mouseleave);

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
