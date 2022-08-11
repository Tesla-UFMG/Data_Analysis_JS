import * as d3 from "d3";
const height = { Mini: 0 };
const MARGIN = { top: 0, left: 40, right: 80, bottom: 25 };

var windowWidth = window.innerWidth - 170;
var vw = windowWidth / 100;

var graphWidth = windowWidth - 8 * vw;

const width = graphWidth;
export default class Xlabel {
  constructor(element) {
    const vis = this;
    vis.svg = d3
      .select(element)
      .append("svg")
      .attr("width", width + MARGIN.left + MARGIN.right)
      .attr("height", height.Mini + MARGIN.top + MARGIN.bottom)
      .append("g")
      .attr("transform", `translate(${MARGIN.left}, ${MARGIN.top})`);
    vis.X = d3.scaleLinear().range([0, width]);
    vis.LabelGroup = vis.svg
      .append("g")
      .attr("class", "xLabel")
      .attr("transform", `translate(0, ${height.Mini})`)
      .attr("color", "black");
  }
  update(newXdomain) {
    const vis = this;
    vis.X.domain(newXdomain);
    vis.minixLabel = d3.axisBottom(vis.X);
    vis.LabelGroup.transition().duration(1000).call(vis.minixLabel.ticks(12));
  }
}
