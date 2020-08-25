import React, { useRef, useState, useEffect } from "react";
import { extent } from "d3";

import D3Chart from "../chart/chart";
import MiniChart from "../chart/miniChart";

const ChartWrapper = ({data, yAxis, xAxis, filterN, medianCheck, avarageCheck, index}) => {

  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);
  const [minichart, setminiChart] = useState(null);
  const [s, setS] = useState(null);
  const [newXdomain, setNewXdomain] = useState(null);

  const handleS = (sRecived) => {
    return setS(sRecived);
  };

  const handleNewX = (xRecived) => {
    return setNewXdomain(xRecived);
  };

  const dataToHandle = ['Intensidade_Frenagem', 'timer', 'Speed_LR', 'Speed_RR', 'Pedal', 'accelX', 'accelY', 'accelZ', 'Volante']

  function handleData() {
    if (dataToHandle.includes(yAxis)) {
      data.map(d => {
        if (yAxis === 'timer' || yAxis === 'accelX' || yAxis === 'accelY' || yAxis === 'accelZ') {
          d.[yAxis] = d.[yAxis] / 1000; 
        }

        if (yAxis === 'Intensidade_Frenagem' || yAxis === 'Speed_LR' || yAxis === 'Speed_RR' || yAxis === 'Pedal') {
          d.[yAxis] = d.[yAxis] / 10; 
        }

        if (yAxis === 'Volante') {
          d.[yAxis] = (d.[yAxis] - 1030) / 10;
        }
      })
    }
  }

  useEffect(() => {
    if (!minichart && index === 0) {
      setminiChart(new MiniChart(chartArea.current));
    } else if (index === 0) {
      const xDomain = extent(data.map((d) => +d[xAxis]));
      const lapLocation = [];
      let lapFlag = 0;
      
      data.map((d) => {
        if (d.beacon === "1" && lapFlag === 0) {
          lapLocation.push(d[xAxis]);
          return (lapFlag = 1);
        } else if (d.beacon === "0" && lapFlag === 1) {
          return (lapFlag = 0);
        
        }
        return lapFlag;
      });
      
      minichart.update(xDomain, lapLocation, handleNewX, handleS);
    }
  }, [minichart, data, xAxis, index]);

  useEffect(() => {
    if (!chart) {
      setChart(new D3Chart(chartArea.current));
    } else if (data) {
      if (filterN) {
        const baseNumber = +filterN;
        let yData = [];
        let xData = [];

        handleData();

        let processData = data.map((d) => {
          yData.push(+d[yAxis]);
          xData.push(+d[xAxis]);
          return [+d[xAxis], +d[yAxis]];
        });

        if (avarageCheck) {
          let mean = 0;

          for (let i = 0; i < processData.length - baseNumber; i++) {
            mean = 0;
            for (let j = i; j < baseNumber + i; j++) {
              mean = mean + processData[j][1];
            }
            mean = mean / baseNumber;
            processData[i][1] = mean;
          }

          for (
            let i = processData.length - baseNumber;
            i < processData.length;
            i++
          ) {
            processData[i][1] = mean;
          }
        } else if (medianCheck) {
          let mean = 0;

          for (let i = 0; i < processData.length - baseNumber; i++) {
            mean = 0;
            for (let j = i; j < baseNumber + i; j++) {
              mean = yData.slice(i, baseNumber + i);
              mean.sort(function (a, b) {
                return a - b;
              });
              let index = Math.floor(baseNumber / 2);
              mean = mean[index];
            }
            mean = mean / baseNumber;
            processData[i][1] = mean;
          }

          for (
            let i = processData.length - baseNumber;
            i < processData.length;
            i++
          ) {
            processData[i][1] = mean;
          }
        }

        chart.update(processData, yAxis, s, newXdomain);
      } else {
        let processData = null;
        chart.update(processData, yAxis, s, newXdomain);
      }
    }
  }, [chart, data, yAxis, xAxis, filterN, medianCheck, avarageCheck, s, newXdomain]);

  return <div className="chart-area" ref={chartArea}></div>;
};

export default ChartWrapper;
