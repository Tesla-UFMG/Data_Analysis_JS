
import React, { useContext, useState, useEffect } from "react";
import { ChartContext } from "../../../../context/chartContext";
import { Parser } from "json2csv";
import YawWrapper from "../../../../components/chartWrapper/yawWrapper";
import { jsPDF } from "jspdf";


const TorqueTotal = () => {
    const chartValues = useContext(ChartContext);
    const [dataX, setDataX] = useState([]);
    const [dataY, setDataY] = useState([]);
    const [csvis, setCsv] = useState();

    useEffect(() => {
        const parser = new Parser();

        const result = chartValues.data.map((value) => {
            const TIMER = +value.TIMER;
            const totalTorque = parseFloat(+value.TORQUE_R) + parseFloat(+value.TORQUE_L) //+value.TorqueT//
            
            return {
              TIMER: TIMER,
              total_torque: totalTorque
            }
        });

        const csv = parser.parse(result);

        setCsv(csv);
        setDataX(result.map((value) => value.TIMER));
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
    function turn2pdf(){ 

      var doc = new jsPDF();
      doc.text(10, 10, 'Tesla');
      doc.save('TorqueTotal.pdf');
    }

    const renderChart = () => {
      return (
        <div>
          <YawWrapper dataX={dataX} dataY={dataY} />

          <div className='button-container'>
            <button onClick={turn2csv} className="export-button">
              Exportar .csv
            </button>
          </div>
          <div className='button-container'>
            <button onClick={turn2pdf} className="export-button2">
              PDF
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

