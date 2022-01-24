import * as d3 from "d3";

const MARGIN = { top: 10, left: 40, right: 0, bottom: 30 };

var windowWidth = window.innerWidth - 200;
// var vw = windowWidth / 100;

// var graphWidth = windowWidth - 5 * vw;

const width = { Graph: windowWidth };
const height = { Graph: 300 };

export default class Overlap {
  constructor(element) {
    const vis = this;

    //Criando o svg
    vis.svg = d3
      .select(element)
      .append("svg")
      .attr("width", width.Graph + MARGIN.left + MARGIN.right)
      .attr("height", height.Graph + MARGIN.top + MARGIN.bottom)
      .attr("class", "graph-svg")
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
  update(dataX, dataY, lapSelect, lapData) {
    const vis = this;
    const max = [];
    const min = [];
    const timer = [];
    const lapX = {};
    const lapY = {};
    vis.data = {};
    vis.lines = {};
    vis.circles = {};

    lapSelect.map((lap) => {
      const lapstart = lapData[lap];
      const lapend = lapData[lap + 1];
      lapX[lap] = dataX.slice(lapstart, lapend);
      lapY[lap] = dataY.slice(lapstart, lapend);
      vis.data[lap] = [];
      for (let i = 0; i < lapend - lapstart; i++) {
        vis.data[lap].push([lapX[lap][i], lapY[lap][i]]);
      }
      max.push(d3.max(lapY[lap]));
      min.push(d3.min(lapY[lap]));
      timer.push(d3.max(lapX[lap]) - d3.min(lapX[lap]));
      return 0;
    });
    const X = d3
      .scaleLinear()
      .range([0, width.Graph])
      .domain([0, d3.max(timer)]);
    const Y = d3
      .scaleLinear()
      .range([0, height.Graph])
      .domain([d3.max(max), d3.min(min)]);
    lapSelect.map((lap) => {
      const lapstart = lapX[lap][0];
      const lineGenerator = d3
        .line()
        .x((d) => X(d[0] - lapstart))
        .y((d) => Y(d[1]));

      //JOIN()
      vis.lines[lap] = vis.svg.selectAll(`#line${lap}`).data([vis.data[lap]]);
      //ENTER()
      vis.lines[lap]
        .enter()
        .append("path")
        .attr("id", `line${lap}`)
        .attr("d", lineGenerator(vis.data[lap]))
        .attr("fill", "none")
        .attr("stroke", function () {
          return "hsl(" + 10/Math.random() * 360 + ",100%,50%)";
        })
        .attr("stroke-width", "0.5px");
      //UPDATE()
      vis.lines[lap].transition().duration(1500).attr("d", lineGenerator);

      vis.focus.selectAll(`#circle${lap}`).remove();
      vis.focus.selectAll(`#text${lap}`).remove();
      vis.focus
        .append("circle")
        .attr("id", `circle${lap}`)
        .attr("r", 2)
        .attr("stroke", "black");
      vis.focus.append("text").attr("id", `text${lap}`).attr("fill", "black");
      return 0;
    });

    vis.xLabel = d3.axisBottom(X);
    vis.yLabel = d3.axisLeft(Y);
    vis.xLabelGroup.transition().duration(1000).call(vis.xLabel.ticks(15));
    vis.yLabelGroup.transition().duration(1000).call(vis.yLabel.ticks(6));
    vis.bigRect
      .on("mouseover", function () {
        vis.focus.style("opacity", "1");
      })
      .on("mouseout", function () {
        vis.focus.style("opacity", "0.6");
      })
      .on("mousemove", mousemove);
    function mousemove() {
      const x0 = X.invert(d3.mouse(this)[0]);
      if(x0) vis.focus.select("path.y").attr("transform", `translate(${X(x0)},0)`);
     
      lapSelect.map((lap) => {
        const lapstart = lapX[lap][0];
        const realX = lapstart + x0;

        const Index = d3.bisectRight(lapX[lap], realX);
        const xCoordenate = lapX[lap][Index];
        const yCoordenate = lapY[lap][Index];

        const toolTipX = X(xCoordenate - lapstart);
        const toolTipY = Y(yCoordenate);
        if (toolTipX||toolTipY) {
          vis.focus
            .select(`#circle${lap}`)
            .attr("transform", `translate(${toolTipX}, ${toolTipY})`);
          vis.focus
            .select(`#text${lap}`)
            .attr("x", toolTipX)
            .attr("y", toolTipY)
            .text(`(${xCoordenate}, ${yCoordenate})  VOLTA${lap}`);
        }
        return 0;
      });
    }
    for (let i = 0; i < lapData.length; i++) {
      if (!vis.lines[i]) {
        vis.svg.selectAll(`#line${i}`).data([vis.data[i]]).remove();
        vis.focus.selectAll(`#circle${i}`).remove();
        vis.focus.selectAll(`#text${i}`).remove();
      }
    }
  }
}
