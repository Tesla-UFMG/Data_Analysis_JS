import React, { useContext, useState, useEffect } from "react";
import { ChartContext } from "../../../../context/chartContext";
import { Parser } from "json2csv";
import YawWrapper from "../../../../components/chartWrapper/yawWrapper";



const Torque2Motores = () => {
    const chartValues = useContext(ChartContext);
    const [dataX, setDataX] = useState([]);
    const [dataY, setDataY] = useState([]);
    const [data2Y, setData2Y] = useState([]);
    const [csvis, setCsv] = useState();

    useEffect(() => {
        const parser = new Parser();

        const result = chartValues.data.map((value) => {
            const timer = +value.Timer;
            const TorqueRM = +value.TorqueRM 
            const TorqueLM = +value.TorqueLM
            return {
              timer: timer,
              torqueRM: TorqueRM,
              torqueLM: TorqueLM
            }
        });

        const csv = parser.parse(result);

        setCsv(csv);
        setDataX(result.map((value) => value.timer));
        setDataY(result.map((value) => value.torqueRM));
        setData2Y(result.map((value) => value.torqueLM));
    }, [chartValues]);

    function turn2csv() {
      const filename = "Torque2Motores.csv";
      const blob = new Blob([csvis], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
    
      a.setAttribute('href', url)
      a.setAttribute('download', filename);
      a.click()
    };

    const renderChart = () => {
      return (
        <div>
          <br></br>
          <h2 className='title-container'>Motor Direito</h2> 
          <YawWrapper dataX={dataX} dataY={dataY} />
          <br></br>
          <h2 className='title-container'>Motor Esquerdo</h2> 
          <YawWrapper dataX={dataX} dataY={data2Y} />

          <div className='button-container'>
            <button onClick={turn2csv} className="export-button">
              Exportar .csv
            </button>
          </div>
        </div>
      );
    };
    
    return (
      <div>
        <div>
          {renderChart()}
        </div>
      </div>
    )
}


export default Torque2Motores