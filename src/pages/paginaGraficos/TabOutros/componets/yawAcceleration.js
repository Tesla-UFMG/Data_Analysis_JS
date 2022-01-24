import React, { useContext, useState, useEffect } from "react";
import { ChartContext } from "../../../../context/chartContext";

import YawWrapper from "../../../../components/chartWrapper/yawWrapper";

export default function YawAcceleration() {
  const chartValues = useContext(ChartContext);
  const [dataX, setDataX] = useState([]);
  const [dataY, setDataY] = useState([]);

  useEffect(() => {
    const auxX = [],
      auxY = [];
    chartValues.data.map((d) => {
      auxX.push(+d.timer);
      auxY.push(+d.accelX);
      return 0;
    });

    setDataX(auxX);
    setDataY(auxY);
  }, [chartValues]);
  const renderChart = () => {
    return <YawWrapper dataX={dataX} dataY={dataY}></YawWrapper>;
  };

  return <div>{renderChart()}</div>;
}
