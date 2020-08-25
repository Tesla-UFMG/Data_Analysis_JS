import React, { useRef, useState, useEffect } from "react";
import MiniChart from "../chart/miniChart";
import { extent } from "d3";
function MiniWrapper(props) {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);
  useEffect(() => {
    if (!chart) {
      setChart(new MiniChart(chartArea.current));
    } else if (props.data) {
      const xDomain = extent(props.data.map((d) => +d[props.xAxis]));
      const lapLocation = [];
      let lapFlag = 0;
      props.data.map((d, i) => {
        if (d.beacon === "1" && lapFlag === 0) {
          lapLocation.push(d[props.xAxis]);
          return (lapFlag = 1);
        } else if (d.beacon === "0" && lapFlag === 1) {
          return (lapFlag = 0);
        }
        return lapFlag;
      });
      chart.update(xDomain, lapLocation);
    }
  }, [chart, props.data, props.xAxis]);

  return <div className="chart-area" ref={chartArea}></div>;
}

export default MiniWrapper;
