import * as d3 from "d3";

const MARGIN = { top: 2, left: 40, right: 80, bottom: 1 };

var windowWidth = window.innerWidth - 100;
var vw = windowWidth / 100;

var graphWidth = windowWidth - 5 * vw;

const width = { Graph: graphWidth };
const height = { Graph: 200 };

export default class D3Chart {
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

    //Estabelecendo o RANGE
    vis.X = d3.scaleLinear().range([0, width.Graph]);
    vis.Y = d3.scaleLinear().range([0, height.Graph]);

    //Separando as LABELS
    vis.yLabelGroup = vis.svg
      .append("g")
      .attr("tranform", `translate(0,0)`)
      .attr("color", "black");

    vis.yTextLabel = vis.svg
      .append("text")
      .attr("x", 0)
      .attr("y", 10)
      .attr("text-achor", "middle")
      .attr("fill", "black");

    vis.clip = vis.svg
      .append("defs")
      .append("SVG:clipPath")
      .attr("id", "clip")
      .append("SVG:rect")
      .attr("width", width.Graph)
      .attr("height", height.Graph)
      .attr("x", 0)
      .attr("y", 0);

    //TOOLTIP
    vis.focus = vis.svg.append("g");
    vis.focus
      .append("circle")
      .attr("class", "y")
      .attr("r", 2)
      .attr("stroke", "black");
    vis.focus.append("text").attr("fill", "black");
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

    vis.lineClip = vis.svg.append("g").attr("clip-path", "url(#clip)");
    vis.horizontalLines = vis.svg.append("g").attr("id", "horizontalLines");
    vis.horizontalLineCounter = 0;
  }

  update(data, yAxis, s, newXdomain, handleVericalLine) {
    const vis = this;
    if (data) {
      vis.data = data;
      vis.xData = [];
      vis.yData = [];
      vis.data.map((d) => {
        vis.xData.push(d[0]);
        vis.yData.push(d[1]);
      });
      const xDomain = d3.extent(vis.data.map((d) => d[0]));
      const yDomain = d3.extent(vis.data.map((d) => d[1]));
      vis.X.domain(xDomain);
      vis.Y.domain([yDomain[1], yDomain[0]]);

      vis.xLabel = d3.axisBottom(vis.X);
      vis.yLabel = d3.axisLeft(vis.Y);
      vis.yLabelGroup.transition().duration(1000).call(vis.yLabel.ticks(6));
      vis.yTextLabel.text(yAxis);

      //ZOOM()
      const zoom = d3
        .zoom()
        .scaleExtent([1, Infinity])
        .translateExtent([
          [0, 0],
          [width.Graph, height.Graph],
        ])
        .extent([
          [0, 0],
          [width.Graph, height.Graph],
        ]);
      if (newXdomain && s) {
        vis.X.domain(newXdomain);
        vis.bigRect.call(
          zoom.transform,
          d3.zoomIdentity.scale(width.Graph / (s[1] - s[0])).translate(-s[0], 0)
        );
      }

      //LINEGENERATOR
      const lineGenerator = d3
        .line()
        .x((d) => vis.X(d[0]))
        .y((d) => vis.Y(d[1]));

      //JOIN()
      vis.lines = vis.lineClip.selectAll(`.line`).data([vis.data]);
      //ENTER()
      vis.lines
        .enter()
        .append("path")
        .attr("class", `line`)
        .attr("d", lineGenerator(vis.data))
        .attr("fill", "none")
        .attr("stroke", "#003cff")
        .attr("stroke-width", "0.5px");

      //EXIT()
      vis.lines.exit().remove();

      //UPDATE()
      vis.lines.transition().duration(1500).attr("d", lineGenerator);

      //TOOLTIP
      vis.bigRect
        .on("mouseover", function () {
          vis.focus.style("opacity", "1");
        })
        .on("mouseout", function () {
          vis.focus.style("opacity", "0.6");
        })
        .on("mousemove", mousemove)
        .on("click", mouseclick);
      function mousemove() {
        const x0 = vis.X.invert(d3.mouse(this)[0]);

        const Index = d3.bisect(vis.xData, x0);
        handleVericalLine(Index);
      }
      function mouseclick() {
        const x0 = vis.X.invert(d3.mouse(this)[0]);
        const Index = d3.bisect(vis.xData, x0);
        const coordenadaY = vis.yData[Index];
        const toolTipY = vis.Y(coordenadaY);
        vis.horizontalLines
          .append("line")
          .attr("x1", 0)
          .attr("y1", toolTipY)
          .attr("x2", width.Graph)
          .attr("y2", toolTipY)
          .attr("stroke", "black")
          .attr("stroke-width", 2)
          .attr("opacity", 0.6)
          .attr("id", `line${vis.horizontalLineCounter}`);
        vis.horizontalLines
          .append("text")
          .attr("id", `text${vis.horizontalLineCounter}`)
          .attr("class", "text")
          .attr("y", toolTipY)
          .text(`${coordenadaY}`)
          .attr("x", width.Graph)
          .on("mousedown", function () {
            vis.horizontalLines.select(`#${this.id}`).remove();
            const auxLine = this.id.replace("text", "line");
            vis.horizontalLines.select(`#${auxLine}`).remove();
          });
        vis.horizontalLineCounter++;
      }
    }
  }
  verticalLine(vertical) {
    const vis = this;
    const coordenadaX = vis.xData[vertical];
    const coordenadaY = vis.yData[vertical];
    const toolTipX = vis.X(coordenadaX);
    const toolTipY = vis.Y(coordenadaY);
    vis.focus
      .select("circle.y")
      .attr("transform", `translate(${toolTipX}, ${toolTipY})`);
    vis.focus.select("path.y").attr("transform", `translate(${toolTipX},0)`);
    vis.focus
      .select("text")
      .attr("x", toolTipX)
      .attr("y", toolTipY)
      .text(`(${coordenadaX}, ${coordenadaY})`);
  }
}
