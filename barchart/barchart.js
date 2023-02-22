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

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h)
  .style("border-style", "solid");

svg
  .selectAll("rect")
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
  // tooltip
  .on("mouseover", function (e, d) {
    console.log(d[1]);
    tooltip
      .style("opacity", 1)

      .attr("data-date", () => {
        return d[0];
      })
      .text(d[0] + "  $ " + d[1] + " Billion")
      .style("top", event.pageY + "px")
      .style("left", event.pageX + "px")
      .style("padding", "10px")
      .style("border", "2px solid black")
      .style("border-radius", "20px")
      .attr("id", "tooltip")
      .style("font-size", "18px");
  })
  .on("mouseout", (e, i) => {
    tooltip.style("opacity", 0);
  });

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
