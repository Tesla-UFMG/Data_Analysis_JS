import * as d3 from "d3";

export default class PlayPause {
  constructor(element) {
    d3.select(element).append("svg").attr("class", "playpause-svg");
  }
}
