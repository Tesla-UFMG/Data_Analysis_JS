import React, {useEffect,useContext,useState} from 'react'
import { ChartContext } from "../../../../../context/chartContext";
import ChartUpdate from "./chartUpdate"
import MiniWrapper from "../../../../../components/chartWrapper/miniChartWrapper"
import Xlabelwrapper from "../../../../../components/chartWrapper/xlabelwrapper"
import Table from "../../../../../components/table/table"
function Data({filterN,avarageCheck,medianCheck}) {
    const chartValues = useContext(ChartContext);
    const [s, setS] = useState(0);
    const [newXdomain, setNewXdomain] = useState(0); 
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
      function renderTable(){
        return chartValues.axisY.map((axis) => {
        return (<Table
        key={axis.column}
        data={chartValues.data}
        xAxis={chartValues.axisX.value}
        yAxis={axis.column}
        filterN={filterN}
        avarageCheck={avarageCheck}
        medianCheck={medianCheck}></Table>)
      })
    }
    
    return (
        <div>
             <MiniWrapper
            data={chartValues.data}
            xAxis={chartValues.axisX.value}
            handleS={(sRecived) => setS(sRecived)}
            handleNewX={(xRecived) => setNewXdomain(xRecived)}
          />
             <ChartUpdate
              data={chartValues.data}
              xAxis={chartValues.axisX.value}
              yAxis={chartValues.axisY}
              filterN={filterN}
              avarageCheck={avarageCheck}
              medianCheck={medianCheck}
              s={s}
              newXdomain={newXdomain}
              ></ChartUpdate>
            <Xlabelwrapper newXdomain={newXdomain}></Xlabelwrapper>
            <div className="table">{renderTable()}</div>
        </div>
    )
}

export default Data
