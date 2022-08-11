import React, { useContext, useState, useEffect } from "react";
import { ChartContext } from "../../../../context/chartContext";
import { Parser } from "json2csv";
import YawWrapper from "../../../../components/chartWrapper/yawWrapper";
import h2p from "./html2pdfs";


const Torque2Motores = () => {
    const chartValues = useContext(ChartContext);
    const [dataX, setDataX] = useState([]);
    const [dataY, setDataY] = useState([]);
    const [data2Y, setData2Y] = useState([]);
    const [csvis, setCsv] = useState();
    const [texto, setTexto] = useState();
    const [nome, setNome] = useState();
    const [subsistema, setSubsistema] = useState();

    useEffect(() => {
        const parser = new Parser();

        const result = chartValues.data.map((value) => {
            const TIMER = +value.TIMER;
            const TorqueRM = +value.TORQUE_R 
            const TorqueLM = +value.TORQUE_L
            return {
              TIMER: TIMER,
              torqueRM: TorqueRM,
              torqueLM: TorqueLM
            }
        });

        const csv = parser.parse(result);

        setCsv(csv);
        setDataX(result.map((value) => value.TIMER));
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
          <div className="textbox-container">
            <input style={{marginLeft:"10px"}} onChange={(e) => {setNome(e.target.value)}} placeholder=' Nome:' maxLength={63} />  
            <input style={{marginLeft:"10px"}} onChange={(e) => {setSubsistema(e.target.value)}} placeholder=' Subsistema:' maxLength={127} />    
          </div> 
          <div id='printThis'>
          <br></br>
          <h2 className='title-container'>Motor Direito</h2> 
          <YawWrapper dataX={dataX} dataY={dataY} />
          <br></br>
          <h2 className='title-container'>Motor Esquerdo</h2> 
          <YawWrapper dataX={dataX} dataY={data2Y} />
          </div>
          

          <div className='button-container'>
            <button onClick={turn2csv} className="export-button">
              Exportar .csv
            </button>
          </div>
          <div className='button-container'>
            <button onClick={(e)=>h2p('Torque 2 Motores',texto,nome,subsistema)} className="export-button2">
              PDF
            </button>
          </div>
          <textarea className='textbox-container' onChange={(e) => {setTexto(e.target.value)}} placeholder=' Descrição para o Relatório' rows="4" cols="50" maxLength={1023} />
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