import * as d3 from "d3";

const MARGIN = { top: 0, left: 50, right: 10, bottom: 0 };
const width = { Graph: 1200 };
const height = { Graph: 200 };

export default class D3Chart {
  constructor(element) {
    const vis = this;
    console.log(element);

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
    vis.xTextLabel = vis.svg
      .append("text")
      .attr("x", width.Graph / 2)
      .attr("y", height.Graph + 40)
      .attr("text-achor", "middle")
      .attr("fill", "black");

    vis.yLabelGroup = vis.svg
      .append("g")
      .attr("tranform", `translate(0,0)`)
      .attr("color", "black");

    vis.yTextLabel = vis.svg
      .append("text")
      .attr("x", 0)
      .attr("y", 0)
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

    vis.lineClip = vis.svg.append("g").attr("clip-path", "url(#clip)");
  }

  update(data, yAxis, xAxis, yData) {
    const vis = this;

    if (data) {
      vis.data = data;

      const xDomain = d3.extent(vis.data.map((d) => d[0]));
      const yDomain = d3.extent(vis.data.map((d) => d[1]));

      vis.X.domain(xDomain);
      vis.Y.domain([yDomain[1], yDomain[0]]);

      vis.xLabel = d3.axisBottom(vis.X);
      vis.yLabel = d3.axisLeft(vis.Y);
      vis.yLabelGroup.transition().duration(1000).call(vis.yLabel.ticks(6));
      vis.yTextLabel.text(yAxis);
      vis.xTextLabel.text(xAxis);

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
      
      //UPDATE
      vis.lines.transition().duration(1500).attr("d", lineGenerator);
    }
  }
}
