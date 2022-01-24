import React, { useState, useEffect, useContext } from "react";
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
  const [data,setData] = useState(null)

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
    const aux = chartValues.data
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
    setData(aux)
  }, [chartValues.data]);
  const renderChart = ()=>{
    if(chartValues.axisY[0]&&data){
      return(
      <Data data = {data}
      filterN={filterN}
          avarageCheck={avarageCheck}
          medianCheck={medianCheck}></Data>)
    }
    else return
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
        <Dropdown
          data={data}
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
      {renderChart()}
    </div>
  );
}

export default TabGeral;
