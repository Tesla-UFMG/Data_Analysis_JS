import * as d3 from "d3";

const MARGIN = { top: 30, left: 50, right: 10, bottom: 70 };
const width = { Mini: 1200 };
const height = { Mini: 50 };

export default class MiniChart {
  constructor(element) {
    const vis = this;

    vis.miniSvg = d3
      .select(element)
      .append("svg")
      .attr("width", width.Mini + MARGIN.left + MARGIN.right)
      .attr("height", height.Mini + MARGIN.top + MARGIN.bottom)
      .append("g")
      .attr("transform", `translate(${MARGIN.left}, ${MARGIN.top})`);

    vis.miniLapLines = vis.miniSvg.append("g").attr("class", "laplines");

    vis.miniX = d3.scaleLinear().range([0, width.Mini]);
    vis.miniY = d3.scaleLinear().range([0, height.Mini]);
    
    vis.minixLabelGroup = vis.miniSvg
      .append("g")
      .attr("class", "minixLabel")
      .attr("transform", `translate(0, ${height.Mini})`)
      .attr("color", "black");
    
    vis.miniFocus = vis.miniSvg.append("g").style("display", "none");
    
    vis.miniFocus
      .append("path")
      .attr("class", "y")
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", "1px")
      .attr(
        "d",
        d3.line()([
          [0, height.Mini],
          [0, 0],
        ])
      );
    
    vis.brush = vis.miniSvg.append("g").attr("class", "brush");
  }

  update(xDomain, lapLocation) {
    const vis = this;

    vis.miniX.domain(xDomain);
    vis.minixLabel = d3.axisBottom(vis.miniX);

    console.log(vis.miniX.range);
    
    lapLocation.map((location, i) => {
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
        .attr("transform", `translate(${vis.miniX(location)},0)`);
    });
    
    vis.minixLabelGroup
      .transition()
      .duration(1000)
      .call(vis.minixLabel.ticks(lapLocation.lenght));
    
    const brush = d3
      .brushX()
      .extent([
        [0, 0],
        [width.Mini, height.Mini],
      ])
      .on("end", brushed);
    
    vis.brush.call(brush);

    function brushed() {
      if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return;
      // ignore brush-by-zoom
      var s = d3.event.selection || vis.miniX.range();
      const newXdomain = s.map(vis.miniX.invert, vis.miniX);
      console.log([s, newXdomain]);
    }
  }
}



