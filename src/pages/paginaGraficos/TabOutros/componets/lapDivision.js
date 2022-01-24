import React, { useContext, useState, useEffect } from "react";
import { ChartContext } from "../../../../context/chartContext";
import Dropdown from "../../TabGeral/components/dropdown/dropdown";
import OverlapWrapper from "../../../../components/chartWrapper/overlapWrapper";

function LapDivision() {
  const chartValues = useContext(ChartContext);

  const [dataX, setDataX] = useState([]);
  const [dataY, setDataY] = useState([]);
  const [dataLap, setDataLap] = useState(null);
  const [lapSelected, setLapSelected] = useState([]);

  useEffect(() => {
    setDataX(chartValues.data.map((d) => +d[chartValues.axisX.value]));
  }, [chartValues.data, chartValues.axisX]);

  useEffect(() => {
    if (chartValues.axisY[0])
      setDataY(chartValues.data.map((d) => +d[chartValues.axisY[0].column]));
  }, [chartValues.data, chartValues.axisY]);

  useEffect(() => {
    let lapFlag = 0;
    let contador = 0;
    let index = [];

    chartValues.data.map((d) => {
      if (d.beacon === "1") {
        if (!lapFlag) index.push(contador);
        lapFlag = 1;
      } else lapFlag = 0;
      contador = contador + 1;

      return 0;
    });
    setDataLap(index);
  }, [chartValues.data]);

  const getCheck = () => {
    const laps = [];

    for (let i = 0; i < dataLap.length - 1; i++) {
      const id = `lap-${i+1}`;
      const check = document.getElementById(id);

      if (check.checked === true) {
        laps.push(i);
      }
    }

    setLapSelected(laps);
  };

  let cont = 0
  const renderCheckboxVoltas = () => {
    if (dataLap) {
      return (
        dataLap.map((laps, i) => {
          if (i*3 < dataLap.length - 1) {
            return (
              <div className="checkbox-wrapper" key={`lap ${i}`}>
                {dataLap.map((lap, index) => {
                  if (index < 3 && cont < dataLap.length - 1) {
                    cont++;
                    return (
                      <div key={`${i} lap`}>
                        <input type="checkbox"
                          className="laps-checkbox"
                          name="laps"
                          id={"lap-" + cont}
                          value={"lap-" + cont}
                          onClick={getCheck}
                        />
                        <label className="label-lap" htmlFor={"lap-" + cont}>Volta {cont}</label>
                      </div>
                    );
                  }
                  else return 0;
                })}
              </div>
            );
          }
          else return 0;
        })
      );
    }
    else return 0;
  };

  const renderOverLapChart = () => {
    if (dataX && chartValues.axisY && dataLap) {
      return (
        <OverlapWrapper
          dataX={dataX}
          dataY={dataY}
          lapSelected={lapSelected}
          lapIndex={dataLap}
        />
      );
    }
  };

  return (
    <div key="lap Division">
      <form>
        <Dropdown
          data={chartValues.data}
          label="Eixo X"
          name="axis-X"
          selectedAxis={(value) => chartValues.setAxisX(value)}
          defaultValue={{ value: "timer", label: "Timer" }}
        />
        <Dropdown
          data={chartValues.data}
          label="Eixo Y"
          name="axis-Y"
          selectedAxis={(value) => chartValues.setAxisY(value)}
          defaultValue={chartValues.axisY.map((axis) => {
            return { value: axis.column, label: axis.column };
          })}
        />
      </form>

      <div className="inputs-container">{renderCheckboxVoltas()}</div>
      <div className="overlap-area">{renderOverLapChart()}</div>
    </div>
  );
}

export default LapDivision;
