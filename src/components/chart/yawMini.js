import * as d3 from "d3";

const MARGIN = { top: 30, left: 50, right: 80, bottom: 30 };

var windowWidth = window.innerWidth - 100;
var vw = windowWidth / 100;

var graphWidth = windowWidth - 70 * vw;

const width = { Graph: graphWidth };
const height = { Graph: 200 };

export default class Yaw {
  constructor(element) {
    const vis = this;

    //Criando o svg
    vis.svg = d3
      .select(element)
      .append("svg")
      .attr("width", width.Graph + MARGIN.left + MARGIN.right)
      .attr("height", height.Graph + MARGIN.top + MARGIN.bottom)
      .attr("class", "mini-accel-svg")
      .append("g")
      .attr("transform", `translate(${MARGIN.left}, ${MARGIN.top})`);

    //Separando as LABELS
    vis.yLabelGroup = vis.svg.append("g").attr("color", "black");
    vis.xLabelGroup = vis.svg
      .append("g")
      .attr("transform", `translate(${0},${height.Graph})`);

    vis.yTextLabel = vis.svg
      .append("text")
      .attr("x", 0)
      .attr("y", 10)
      .attr("text-achor", "middle")
      .attr("fill", "black");
    //TOOLTIP
    vis.focus = vis.svg.append("g");
    vis.focus
      .append("path")
      .attr("class", "y")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", "1px")
      .attr(
        "d",
        d3.line()([
          [0, height.Graph],
          [0, 0],
        ])
      );
    vis.bigRect = vis.svg
      .append("rect")
      .attr("width", width.Graph)
      .attr("height", height.Graph)
      .style("fill", "none")
      .style("pointer-events", "all");
  }
  update(dataX, dataY) {
    const vis = this;
    vis.data = [];

    dataY.map((d, i) => vis.data.push([dataX[i], d]));
    const X = d3
      .scaleLinear()
      .range([0, width.Graph])
      .domain([0, d3.max(dataX)]);
    const Y = d3
      .scaleLinear()
      .range([0, height.Graph])
      .domain([d3.max(dataY), d3.min(dataY)]);

    const lineGenerator = d3
      .line()
      .x((d) => X(d[0]))
      .y((d) => Y(d[1]))
      .curve(d3.curveMonotoneX);

    //JOIN()
    vis.lines = vis.svg.selectAll(`#line`).data([vis.data]);
    //ENTER()
    vis.lines
      .enter()
      .append("path")
      .attr("id", `line`)
      .attr("d", lineGenerator(vis.data))
      .attr("fill", "none")
      .attr("stroke", function () {
        return "hsl(" + Math.random() * 360 + ",100%,50%)";
      })
      .attr("stroke-width", "0.5px");
    //UPDATE()
    vis.lines.transition().duration(1500).attr("d", lineGenerator);
    //REMOVE()
    vis.lines.exit().remove();
    vis.xLabel = d3.axisBottom(X);
    vis.yLabel = d3.axisLeft(Y);
    vis.xLabelGroup.transition().duration(1000).call(vis.xLabel.ticks(3));
    vis.yLabelGroup.transition().duration(1000).call(vis.yLabel.ticks(6));
  }
}
