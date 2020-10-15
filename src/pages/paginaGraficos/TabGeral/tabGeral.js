import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { tsv } from "d3";

import { FileContext } from "../../../context/fileContext";
import { ChartContext } from "../../../context/chartContext";

import ChartWrapper from "../../../components/chartWrapper/chartWrapper";
import ConfigRow from "./components/configRow/configRow";
import Dropdown from "./components/dropdown/dropdown";
import MiniWrapper from "../../../components/chartWrapper/miniChartWrapper";
import Xlabelwrapper from "../../../components/chartWrapper/xlabelwrapper";

import "./tabGeral.css";

function TabGeral() {
  const history = useHistory();

  const [selectFile] = useContext(FileContext);
  const chartValues = useContext(ChartContext);

  const [submit, setSubmit] = useState(false);
  const [filterN, setFilterN] = useState(1);
  const [avarageCheck, setAvarageCheck] = useState(false);
  const [medianCheck, setMedianCheck] = useState(false);
  const [s, setS] = useState(0);
  const [newXdomain, setNewXdomain] = useState(0);
  const [vertical, setVertical] = useState(0);

  useEffect(() => {
    const fileName = selectFile.map((file) => {
      return { file: require(`../../../files/${file.label}`) };
    });

    if (fileName.length !== 0) {
      tsv(fileName[0].file)
        .then((d) => chartValues.setData(d))
        .catch((err) => console.log(err));
    } else {
      history.push("/");
    }
  }, []);

  useEffect(() => {
    if (chartValues.data) {
      chartValues.data.map((d) => {
        d["timer"] = d["timer"] / 1000;
        d["accelX"] = d["accelX"] / 1000;
        d["accelY"] = d["accelY"] / 1000;
        d["accelZ"] = d["accelZ"] / 1000;
        d["Intensidade_Frenagem"] = d["Intensidade_Frenagem"] / 10;
        d["Speed_LR"] = d["Speed_LR"] / 10;
        d["Speed_RR"] = d["Speed_RR"] / 10;
        d["Pedal"] = d["Pedal"] / 10;
        d["Volante"] = (d["Volante"] - 1030) / 10;
        return 0;
      });
    }
  }, [chartValues.data]);

  function renderMiniChart() {
    return (
      <MiniWrapper
        data={chartValues.data}
        xAxis={chartValues.axisX.value}
        handleS={(sRecived) => setS(sRecived)}
        handleNewX={(xRecived) => setNewXdomain(xRecived)}
      />
    );
  }
  const handleVertical = (verticalRecive) => {
    setVertical(verticalRecive);
  };

  function renderChart() {
    return chartValues.axisY.map((axis) => {
      return (
        <ChartWrapper
          key={axis.column}
          data={chartValues.data}
          xAxis={chartValues.axisX.value}
          yAxis={axis.column}
          filterN={filterN}
          avarageCheck={avarageCheck}
          medianCheck={medianCheck}
          s={s}
          newXdomain={newXdomain}
          handleVertical={handleVertical}
          vertical={vertical}
        />
      );
    });
  }
  function renderXLabel() {
    return <Xlabelwrapper newXdomain={newXdomain}></Xlabelwrapper>;
  }

  return (
    <div id="tab-geral">
      <h1 className="tab-title">Opções de Plotagem</h1>

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
          name="axis-y"
          selectedAxis={(value) => chartValues.setAxisY(value)}
          defaultValue={chartValues.axisY.map((axis) => {
            return { value: axis.column, label: axis.column };
          })}
        />
      </form>

      <ConfigRow
        filterN={(number) => setFilterN(number)}
        avarage={(value) => setAvarageCheck(value)}
        median={(value) => setMedianCheck(value)}
      />

      <div className="row">
        <button
          type="button"
          className="btn plot-button"
          onClick={() => setSubmit(true)}
        >
          Plotar
        </button>
      </div>

      <div>{submit && renderMiniChart()}</div>
      <div className="chart">{submit && renderChart()}</div>
      <div className="xlabelarea">{submit && renderXLabel()}</div>
    </div>
  );
}

export default TabGeral;
