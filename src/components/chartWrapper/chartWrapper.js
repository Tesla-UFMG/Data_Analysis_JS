import React, { useRef, useState, useEffect } from "react";

import D3Chart from "../chart/chart";
const ChartWrapper = ({
  data,
  yAxis,
  xAxis,
  filterN,
  medianCheck,
  avarageCheck,
  s,
  newXdomain,
  handleVertical,
  vertical,
}) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);
  const [integral, setIntegral] = useState(null);
  const [derivate, setDerivate] = useState(null);
  const [regression, setRegression] = useState(null);
  const handleVerticalLine = (Xcoordinate) => {
    handleVertical(Xcoordinate);
  };
  useEffect(() => {
    if (!chart) {
      setChart(new D3Chart(chartArea.current));
    } else if (data) {
      let yData = [];
      let xData = [];
      let processData = data.map((d) => {
        yData.push(+d[yAxis]);
        xData.push(+d[xAxis]);
        return [+d[xAxis], +d[yAxis]];
      });
      if (integral) {
        const integration = [];
        integration[0] = yData[0];
        for (let i = 1; i < yData.length - 1; i++) {
          integration[i] =
            integration[i - 1] +
            ((yData[i + 1] + yData[i]) * (xData[i + 1] - xData[i])) / 2;
          processData[i][1] = integration[i];
        }
        yData = integration;
        xData.pop();
        processData.pop();
        xData.pop();
        processData.pop();
      } else if (derivate) {
        const derivation = [];
        for (let i = 0; i < yData.length - 1; i++) {
          derivation[i] = (yData[i + 1] - yData[i]) / (xData[i + 1] - xData[i]);
          processData[i][1] = derivation[i];
        }
        yData = derivation;
        xData.pop();
        processData.pop();
        xData.pop();
        processData.pop();
      }
      if (filterN) {
        const baseNumber = +filterN;

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

        chart.update(
          processData,
          yAxis,
          s,
          newXdomain,
          handleVerticalLine,
          regression
        );
      } else {
        let processData = null;
        chart.update(processData, yAxis, s, newXdomain);
      }
    }
  }, [
    chart,
    data,
    yAxis,
    xAxis,
    filterN,
    medianCheck,
    avarageCheck,
    s,
    newXdomain,
    integral,
    derivate,
    regression,
  ]);
  useEffect(() => {
    if (!chart || !vertical);
    else {
      chart.verticalLine(vertical);
    }
  }, [chart, vertical]);
  const handleIntegral = () => {
    const iChecked = document.getElementById(`check-integral-${yAxis}`).checked;
    setIntegral(iChecked);
    document.getElementById(`check-derivate-${yAxis}`).checked = false;
    setDerivate(false);
  };
  const handleDerivate = () => {
    const iChecked = document.getElementById(`check-derivate-${yAxis}`).checked;
    setDerivate(iChecked);
    document.getElementById(`check-integral-${yAxis}`).checked = false;
    setIntegral(false);
  };
  const handleRegression = () => {
    const iChecked = document.getElementById(`check-regression-${yAxis}`)
      .checked;
    setRegression(iChecked);
  };
  return (
    <div className="full-chart-area" style={{ display: "flex" }}>
      <div className="chart-area" ref={chartArea}></div>
      <div className="integration-derivation">
        <input
          className="checkbox"
          type="checkbox"
          value="integral"
          id={`check-integral-${yAxis}`}
          onChange={handleIntegral}
        />
        <label className="checkbox" htmlFor={`check-integral-${yAxis}`}>
          integrar
        </label>
        <input
          className="checkbox"
          type="checkbox"
          value="derivate"
          id={`check-derivate-${yAxis}`}
          onChange={handleDerivate}
        />
        <label className="checkbox" htmlFor={`check-derivate-${yAxis}`}>
          derivar
        </label>
        <input
          className="checkbox"
          type="checkbox"
          value="regression"
          id={`check-regression-${yAxis}`}
          onChange={handleRegression}
        />
        <label className="checkbox" htmlFor={`check-regression-${yAxis}`}>
          regressao linear
        </label>
      </div>
    </div>
  );
};

export default ChartWrapper;
