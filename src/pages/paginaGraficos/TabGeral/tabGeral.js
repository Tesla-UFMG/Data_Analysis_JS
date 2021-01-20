import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { tsv } from "d3";

import { FileContext } from "../../../context/fileContext";
import { ChartContext } from "../../../context/chartContext";

import Data from "./components/graficos/data";
import ConfigRow from "./components/configRow/configRow";
import Dropdown from "./components/dropdown/dropdown";
import "./tabGeral.css";

function TabGeral() {
  const history = useHistory();

  const [selectFile] = useContext(FileContext);
  const chartValues = useContext(ChartContext);

  const [filterN, setFilterN] = useState(1);
  const [avarageCheck, setAvarageCheck] = useState(false);
  const [medianCheck, setMedianCheck] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fileName = {};
    selectFile.map((file) => {
      return (fileName[file.label] = {
        file: require(`../../../files/${file.label}`),
      });
    });
    selectFile.map((file) => {
      if (fileName[file.label].length !== 0) {
        tsv(fileName[file.label].file)
          .then((d) => {
            let aux = {};
            aux = { ...chartValues.data };
            aux[file.label] = d;
            chartValues.setData(aux);
            return chartValues.setData(aux);
          })
          .catch((err) => console.log(err));
      } else {
        history.push("/");
      }
      return 0;
    });
  }, []);

  useEffect(() => {
    const aux = chartValues.data;
    selectFile.map((file) => {
      if (aux[file.label]) {
        aux[file.label].map((d) => {
          d["timer"] = d["timer"] / 1000;
          d["accelX"] = d["accelX"] / 1000;
          d["accelY"] = d["accelY"] / 1000;
          d["accelZ"] = d["accelZ"] / 1000;
          d["Intensidade_Frenagem"] = d["Intensidade_Frenagem"] / 10;
          d["Speed_LR"] = d["Speed_LR"] / 10;
          d["Speed_RR"] = d["Speed_RR"] / 10;
          d["Pedal"] = d["Pedal"] / 10;
          d["Volante"] = (d["Volante"] - 1030) / 10;
          setData({ ...data, ...aux });
          return 0;
        });
      }
      return 0;
    });
  }, [chartValues.data]);

  const renderChart = () => {
      if (Object.entries(chartValues.axisY).length && data) {
        return (
          <Data
            data={data}
            filterN={filterN}
            avarageCheck={avarageCheck}
            medianCheck={medianCheck}
          />
        );
      } else return;
  };

  function renderDropDown() {
    if (selectFile && data) {
      return selectFile.map((file) => {
        return (
          <Dropdown
            key={file.label}
            data={data[file.label]}
            label={file.label}
            name={file.label}
            selectedAxis={(value) => {
              const aux = chartValues.axisY;
              aux[file.label] = value;
              chartValues.setAxisY({ ...aux });
              return chartValues.setAxisY({ ...aux });
            }}
            defaultValue={() => {
              if (chartValues.axisY[file.label]) {
                chartValues.axisY[file.label].map((axis) => {
                  return { value: axis.column, label: axis.column };
                });
              }
            }}
          />
        );
      });
    } else return;
  }

  return (
    <div id="tab-geral">
      <h1 className="tab-title">Opções de Plotagem</h1>

      <form>
        <Dropdown
          data={data}
          label="Eixo X"
          name="axis-X"
          selectedAxis={(value) => chartValues.setAxisX(value)}
          defaultValue={{ value: "timer", label: "Timer" }}
        />
        <div>
          <p className="dropdown-row-label">Eixo Y</p>
          <div className="dropdown-row">{renderDropDown()}</div>
        </div>
      </form>

      <ConfigRow
        filterN={(number) => setFilterN(number)}
        avarage={(value) => setAvarageCheck(value)}
        median={(value) => setMedianCheck(value)}
      />
      {renderChart()}
    </div>
  );
}

export default TabGeral;
/*import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { tsv } from "d3";


import { FileContext } from "../../../context/fileContext";
import { ChartContext } from "../../../context/chartContext";


import Data from "./components/graficos/data"
import ConfigRow from "./components/configRow/configRow";
import Dropdown from "./components/dropdown/dropdown";
import "./tabGeral.css";

function TabGeral() {
  const history = useHistory();

  const [selectFile] = useContext(FileContext);
  const chartValues = useContext(ChartContext);

  const [filterN, setFilterN] = useState(1);
  const [avarageCheck, setAvarageCheck] = useState(false);
  const [medianCheck, setMedianCheck] = useState(false);
  const [data, setData] = useState(null);
  const [data02, setData02] = useState(null);

  // useEffect(() => {
  //   const fileName = selectFile.map((file) => {
  //     return { file: require(`../../../files/${file.label}`) };
  //   });

  //   if (fileName.length !== 0) {
  //     tsv(fileName[0].file)
  //       .then((d) => chartValues.setData(d))
  //       .catch((err) => console.log(err));
  //   } else {
  //     history.push("/");
  //   }
  // }, []);

  useEffect(() => {
    var fileName = { 
      file01: '',
      file02: '',
    }

    fileName = selectFile.map((file, index) => {
      if (index === 0) {
        return fileName.file01 = require(`../../../files/${file.label}`);
      } else if (index === 1) {
        return fileName.file02 = require(`../../../files/${file.label}`);
      }
    });

    if (fileName.length !== 0) {
      tsv(fileName[0])
        .then((d) => chartValues.setData(d))
        .catch((err) => console.log(err));

      if (fileName.length === 2) {
        tsv(fileName[1])
        .then((d) => chartValues.setData02(d))
        .catch((err) => console.log(err));
      }
    } else {
      history.push("/");
    }
  }, []);

  useEffect(() => {
    const aux = chartValues.data
    const aux02 = chartValues.data02
    if (aux) {      
      aux.map((d) => {        
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

    if (aux02) {      
      aux02.map((d) => {        
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
    setData(aux)
    setData02(aux02)
  }, [chartValues.data, chartValues.data02]);

  const renderChart = ()=>{
    if(chartValues.axisY[0]&&data){
      return(
      <Data data = {data}
        filterN={filterN}
        avarageCheck={avarageCheck}
        medianCheck={medianCheck} 
      />)
    } else return
  }
  
  return (
    <div id="tab-geral">
      <h1 className="tab-title">Opções de Plotagem</h1>
      
      <form>

        <Dropdown
          data={data}
          label="Eixo X"
          name="axis-X"
          selectedAxis={(value) => chartValues.setAxisX(value)}
          defaultValue={{ value: "timer", label: "Timer" }}
        />
        {selectFile.length === 2
          ? <div>
              <p className="dropdown-row-label">Eixo Y</p>
              <div className="dropdown-row">
                <Dropdown
                  data={data}
                  label={selectFile[0].label}
                  name="axis-y-1"
                  selectedAxis={(value) => chartValues.setAxisY(value)}
                  defaultValue={chartValues.axisY.map((axis) => {
                    return { value: axis.column, label: axis.column };
                  })}
                />
                <Dropdown
                  data={data02}
                  label={selectFile[1].label}
                  name="axis-y-2"
                  selectedAxis={(value) => chartValues.setAxisY(value)}
                  defaultValue={chartValues.axisY.map((axis) => {
                    return { value: axis.column, label: axis.column };
                  })}
                />
              </div>
            </div> 
          : <Dropdown
              data={data}
              label="Eixo Y"
              name="axis-y"
              selectedAxis={(value) => chartValues.setAxisY(value)}
              defaultValue={chartValues.axisY.map((axis) => {
                return { value: axis.column, label: axis.column };
              })}
            />
        }
      </form>

      
      <ConfigRow
        filterN={(number) => setFilterN(number)}
        avarage={(value) => setAvarageCheck(value)}
        median={(value) => setMedianCheck(value)}
      />
      {renderChart()}
    </div>
  );
}

export default TabGeral;*/
