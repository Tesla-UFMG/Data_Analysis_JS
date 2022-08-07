import React, { useContext, useState, useEffect } from "react";
import { ChartContext } from "../../../../context/chartContext";
import { Parser } from "json2csv";
import YawWrapper from "../../../../components/chartWrapper/yawWrapper";

const EficienciaMedia = () => {

    const chartValues = useContext(ChartContext);
    const [dataX, setDataX] = useState([]);
    const [dataY, setDataY] = useState([]);
    const [csvis, setCsv] = useState();

    useEffect(() => {
        const parser = new Parser();

        const result = chartValues.data.map((value) => {
            const TIMER = +value.TIMER;
            const ACCEL_X = +value.ACCEL_X
            
            return {
              TIMER: TIMER,
              aceleracao: ACCEL_X
            }
        });

        const csv = parser.parse(result);

        setCsv(csv);
        setDataX(result.map((value) => value.TIMER));
        setDataY(result.map((value) => value.aceleracao));
    }, [chartValues]);

    function turn2csv() {
      const filename = "EficienciaMedia.csv";
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
          <h2 className='title-container'>Não implementado</h2> 
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



export default EficienciaMedia