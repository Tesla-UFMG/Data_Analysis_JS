import * as d3 from "d3";
const MARGIN = { top: 30, left: 50, right: 80, bottom: 30 };

var windowWidth = window.innerWidth - 100;
var vw = windowWidth / 100;

var graphWidth = windowWidth - 5 * vw;

const width = { Graph: graphWidth };
const height = { Graph: 100 };
export default class PlayPause {
  constructor(element) {
    const vis = this
    vis.svg = d3.select(element).append("svg").attr("class", "playpause-svg").attr("width", width.Graph + MARGIN.left + MARGIN.right).attr("height", height.Graph + MARGIN.top + MARGIN.bottom)
    vis.button = d3.select(element).append("button").attr("class", "playButton")
    vis.slider = vis.svg.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + MARGIN.left + "," + height.Graph/5 + ")");
  }
  update(){

  }
}
