import * as d3 from "d3";

const height = { Mini: 50 };
const MARGIN = { top: 30, left: 40, right: 80, bottom: 70 };
export default class MiniChart {
  constructor(element, width) {
    const vis = this;
    vis.width = width;
    vis.miniSvg = d3
      .select(element)
      .append("svg")
      .attr("width", vis.width.Mini + MARGIN.left + MARGIN.right)
      .attr("height", height.Mini + MARGIN.top + MARGIN.bottom)
      .append("g")
      .attr("transform", `translate(${MARGIN.left}, ${MARGIN.top})`);

    vis.miniLapLines = vis.miniSvg.append("g").attr("class", "laplines");

    vis.miniX = d3.scaleLinear().range([0, vis.width.Mini]);
    vis.miniY = d3.scaleLinear().range([0, height.Mini]);

    vis.minixLabelGroup = vis.miniSvg
      .append("g")
      .attr("class", "minixLabel")
      .attr("transform", `translate(0, ${height.Mini})`)
      .attr("color", "black");

    vis.brush = vis.miniSvg.append("g").attr("class", "brush");
  }
  remakeSVG(width) {
    const vis = this;
    vis.width = width;
    vis.miniSvg.attr("width", vis.width.Mini + MARGIN.left + MARGIN.right);
    vis.miniX = d3.scaleLinear().range([0, vis.width.Mini]);
  }
  update(xDomain, lapLocation, handleNewX, handleS) {
    const vis = this;

    vis.miniX.domain(xDomain);
    vis.minixLabel = d3.axisBottom(vis.miniX);

    lapLocation.map((location, i) =>
      vis.miniLapLines
        .append("path")
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", "1px")
        .attr("class", `line${i}`)
        .attr(
          "d",
          d3.line()([
            [0, height.Mini],
            [0, 0],
          ])
        )
        .attr("transform", `translate(${vis.miniX(location)},0)`)
    );
    vis.miniLapLines.exit().transition().duration(1500).remove();
    lapLocation.map((location, i) =>
      vis.miniLapLines
        .selectAll(`.line${i}`)
        .transition()
        .duration(1000)
        .attr("transform", `translate(${vis.miniX(location)},0)`)
    );
    vis.minixLabelGroup
      .transition()
      .duration(1000)
      .call(vis.minixLabel.ticks(lapLocation.lenght));

    const brush = d3
      .brushX()
      .extent([
        [0, 0],
        [vis.width.Mini, height.Mini],
      ])
      .on("end", brushed);
    vis.brush.call(brush).call(brush.move, vis.miniX.range());

    function brushed() {
      if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return;
      // ignore brush-by-zoom
      var s = d3.event.selection || vis.miniX.range();
      const newXdomain = s.map(vis.miniX.invert, vis.miniX);
      handleNewX(newXdomain);
      handleS(s);
    }
  }
}
