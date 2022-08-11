import React, { useRef, useState, useEffect } from "react";
import { extent } from "d3";

import MiniChart from "../chart/miniChart";

function MiniWrapper({ data, xAxis, handleS, handleNewX }) {
  const chartArea = useRef(null);
  const [minichart, setminiChart] = useState(null);

  const hS = (sRecived) => {
    handleS(sRecived);
  };
  const hX = (xRecived) => {
    handleNewX(xRecived);
  };
  useEffect(() => {
    var windowWidth = window.innerWidth - 170;
    var vw = windowWidth / 100;
    var graphWidth = windowWidth - 8 * vw;
    const width = { Mini: graphWidth };
    if (!minichart) {
      setminiChart(new MiniChart(chartArea.current, width));
    } else {
      minichart.remakeSVG(width);
    }
  }, [minichart]);

  useEffect(() => {
    if (minichart) {
      const xDomain = extent(data.map((d) => +d[xAxis]));
      const lapLocation = [];
      let lapFlag = 0;

      data.map((d, i) => {
        if (d.beacon === "1" && lapFlag === 0) {
          lapLocation.push(d[xAxis]);
          return (lapFlag = 1);
        } else if (d.beacon === "0" && lapFlag === 1) {
          return (lapFlag = 0);
        }
        return lapFlag;
      });

      minichart.update(xDomain, lapLocation, hX, hS);
    }
  }, [minichart, data, xAxis]);

  return <div className="mini-chart-area" ref={chartArea}></div>;
}

export default MiniWrapper;
