
import React, { useContext, useState, useEffect } from "react";
import { ChartContext } from "../../../../context/chartContext";
import { Parser } from "json2csv";
import YawWrapper from "../../../../components/chartWrapper/yawWrapper";



const TorqueTotal = () => {
    const chartValues = useContext(ChartContext);
    const [dataX, setDataX] = useState([]);
    const [dataY, setDataY] = useState([]);
    const [csvis, setCsv] = useState();

    useEffect(() => {
        const parser = new Parser();

        const result = chartValues.data.map((value) => {
            const timer = +value.Timer;
            const totalTorque = parseFloat(+value.TorqueRM) + parseFloat(+value.TorqueLM)
            
            return {
              timer: timer,
              total_torque: totalTorque
            }
        });

        const csv = parser.parse(result);

        setCsv(csv);
        setDataX(result.map((value) => value.timer));
        setDataY(result.map((value) => value.total_torque));
    }, [chartValues]);

    function turn2csv() {
      const filename = "TorqueTotal.csv";
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
          <YawWrapper dataX={dataX} dataY={dataY} />

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

export default TorqueTotal

