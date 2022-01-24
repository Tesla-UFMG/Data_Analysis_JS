import React, { useRef, useState, useEffect } from "react";
import Xlabel from "../chart/xlabel";

function Xlabelwrapper({ newXdomain }) {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      setChart(new Xlabel(chartArea.current));
    } else if (newXdomain) {
      chart.update(newXdomain);
    }
  }, [chart, newXdomain]);

  return <div className="xLabel-area" ref={chartArea}></div>;
}

export default Xlabelwrapper;
