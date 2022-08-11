import React, { useRef, useState, useEffect } from "react";
import Overlap from "../chart/overlap";

function OverlapWrapper({ dataX, dataY, lapSelected, lapIndex }) {
  const chartArea = useRef(null);
  const [overLapChart, setOverLapChart] = useState(null);
  useEffect(() => {
    if (!overLapChart) {
      setOverLapChart(new Overlap(chartArea.current));
    } else {
      overLapChart.update(dataX, dataY, lapSelected, lapIndex);
    }
  }, [overLapChart, lapSelected, dataX, dataY, lapIndex]);
  return <div className="overlap-chart-area" ref={chartArea}></div>;
}

export default OverlapWrapper;
