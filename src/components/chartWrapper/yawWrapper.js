import React, { useState, useEffect, useRef } from "react";

import Yaw from "../chart/yaw";
import YawMini from "../chart/yawMini";
import PlayPause from "../chart/playPause";

function YawWrapper({ dataX, dataY }) {
  const [dffx, setDFFX] = useState(null);
  const [dffy, setDFFY] = useState(null);
  const chartArea = useRef(null);
  const miniChart = useRef(null);
  const playPause = useRef(null);
  const [yawChart, setyawChart] = useState(null);
  const [accelChart, setAccelChart] = useState(null);
  const [pp, setPP] = useState(null);

  useEffect(() => {
    if (dataX && dataY) {
      const derivation = [];
      for (let i = 0; i < dataY.length - 1; i++) {
        derivation[i] = (dataY[i + 1] - dataY[i]) / (dataX[i + 1] - dataX[i]);
      }
      const integration = [];
      for (let i = 0; i < dataY.length - 1; i++) {
        integration[i] =
          ((dataY[i + 1] + dataY[i]) / 2) * (dataX[i + 1] - dataX[i]);
      }
      setDFFX(dataX);
      setDFFY(derivation);
    }
  }, [dataX, dataY]);
  useEffect(() => {
    if (!yawChart) {
      setyawChart(new Yaw(chartArea.current));
    } else if (dffx && dffy) {
      yawChart.update(dffx, dffy);
    }
  }, [yawChart, dffx, dffy]);
  useEffect(() => {
    if (!accelChart) {
      setAccelChart(new YawMini(miniChart.current));
    } else if ((dataX, dataY)) {
      accelChart.update(dataX, dataY);
    }
  }, [dataX, dataY, accelChart]);
  useEffect(() => {
    if (!pp) {
      setPP(new PlayPause(playPause.current));      
    } else if(dataX){
      pp.update(dataX)
    }
  }, [pp,dataX]);

  return (
    <div>
      <div className="mini-yaw" ref={miniChart}></div>
      <div className="yaw-chart-area" ref={chartArea}></div>
      <div className="play-pause" ref={playPause}></div>
    </div>
  );
}

export default YawWrapper;
