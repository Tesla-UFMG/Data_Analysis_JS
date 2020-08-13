import React, { useRef, useState, useEffect } from "react";
import D3Chart from "./chart";

const ChartWrapper = ({
  data,
  yAxis,
  xAxis,
  filterN,
  medianCheck,
  avarageCheck,
}) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);
  useEffect(() => {
    if (!chart) {
      setChart(new D3Chart(chartArea.current));
    } else if (data) {
      if (filterN) {
        let yData = [];
        let processData = data.map((d) => {
          yData.push(d[yAxis]);
          return [+d[xAxis], +d[yAxis]];
        });
        const baseNumber = +filterN;
        console.log([medianCheck, avarageCheck]);
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
        chart.update(processData, yAxis, xAxis, yData);
      } else {
        let processData = null;
        chart.update(processData, yAxis, xAxis);
      }
    }
  }, [chart, data, yAxis, xAxis, filterN, medianCheck, avarageCheck]);

  return <div className="chart-area" ref={chartArea}></div>;
};

export default ChartWrapper;
