import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { tsv } from "d3";

import { FileContext } from "../../../context/fileContext";
import ChartWrapper from "../../../components/chartWrapper/chartWrapper";
import ConfigRow from "./components/configRow/configRow";
import Dropdown from "./components/dropdown/dropdown";

import "./tabGeral.css";

function TabGeral() {
  const history = useHistory();

  const [selectFile, setSelectFile] = useContext(FileContext);

  const [data, setData] = useState([]);
  // const [dataframe, setDataframe] = useState({})
  const [axisX, setAxisX] = useState({ value: "timer", label: "Timer" });
  const [axisY, setAxisY] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [filterN, setFilterN] = useState(1);
  const [avarageCheck, setAvarageCheck] = useState(false);
  const [medianCheck, setMedianCheck] = useState(false);

  useEffect(() => {
    const fileName = selectFile.map((file) => {
      return { file: require(`../../../files/${file.label}`) };
    });

    if (fileName.length !== 0) {
      tsv(fileName[0].file)
        .then((d) => setData(d))
        .catch((err) => console.log(err));
    } else {
      history.push("/");
    }
  }, []);

  function plotingGraphs() {
    setSubmit(true);
  }

  function renderChart() {
    return axisY.map((axis, i) => {
      return (
        <ChartWrapper
          key={axis.column}
          data={data}
          xAxis={axisX.value}
          yAxis={axis.column}
          filterN={filterN}
          avarageCheck={avarageCheck}
          medianCheck={medianCheck}
          index={i}
        />
      );
    });
    // return <Chart data={dataframe[0]} />
  }
  return (
    <div id="tab-geral">
      <h1 className="tab-title">Opções de Plotagem</h1>

      <form>
        <Dropdown
          data={data}
          label="Eixo X"
          name="axis-X"
          selectedAxis={(value) => setAxisX(value)}
          defaultValue={{ value: "timer", label: "Timer" }}
        />
        <Dropdown
          data={data}
          label="Eixo Y"
          name="axis-y"
          selectedAxis={(value) => setAxisY(value)}
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
          onClick={plotingGraphs}
        >
          Plotar
        </button>
      </div>
      <div className="chart">{submit && renderChart()}</div>

      <div className="row">
        <button type="button" className="btn opcoes-avancadas-button">
          Opções Avançadas
        </button>
      </div>
    </div>
  );
}

export default TabGeral;
