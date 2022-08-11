import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { tsv } from "d3";


import { FileContext } from "../../../context/fileContext";
import { ChartContext } from "../../../context/chartContext";

//import express from 'express'
import Data from "./components/graficos/data"
//import ConfigRow from "./components/configRow/configRow";
import Dropdown from "./components/dropdown/dropdown";
import "./tabGeral.css";
//const app = express();
import h2p from "../TabOutros/componets/html2pdfs";

function TabGeral() {
  const history = useHistory();

  const [selectFile] = useContext(FileContext);
  const chartValues = useContext(ChartContext);
  const [texto, setTexto] = useState();
  const [nome, setNome] = useState();
  const [subsistema, setSubsistema] = useState();
  const [arquivo, setArquivo] = useState();

  //const [filterN, setFilterN] = useState(1);
  //const [avarageCheck, setAvarageCheck] = useState(false);
  //const [medianCheck, setMedianCheck] = useState(false);
  const [data,setData] = useState(null)

  useEffect(() => {

      const fileName = selectFile.map((file) => {
        return (file.label)
      })
      if (fileName.length !== 0) {
      tsv(`../../../files/${fileName}`)
        .then((d) => chartValues.setData(d))
        .catch((err) => console.log(err));
      }
      else{
        history.push("/");
      }},
      [selectFile]);
  useEffect(() => {
   
    const aux = chartValues.data
    //console.log(aux)
    if (aux) {      
      aux.map((d) => {        
        d["TIMER"] = d["TIMER"] / 1000;
        d["ACCEL_X"] = d["ACCEL_X"] / 1000;
        d["ACCEL_Y"] = d["ACCEL_Y"] / 1000;
        d["ACCEL_Z"] = d["ACCEL_Z"] / 1000;
        d["Intensidade_Frenagem"] = d["Intensidade_Frenagem"] / 10;
        d["Speed_LR"] = d["Speed_LR"] / 10;
        d["Speed_RR"] = d["Speed_RR"] / 10;
        d["Pedal"] = d["Pedal"] / 10;
        d["VOL"] = (d["VOL"] - 1030) / 10;
        return 0;
      });
    }
    setData(aux)
  }, [chartValues.data]);
  const renderChart = ()=>{
    if(chartValues.axisY[0]&&data){
      console.log(chartValues.axisY[0])
      return(
        <div>
          <br></br>
          <div className="textbox-container">
            <input style={{marginLeft:"10px"}} onChange={(e) => {setNome(e.target.value)}} placeholder=' Nome:' maxLength={63} />  
            <input style={{marginLeft:"10px"}} onChange={(e) => {setSubsistema(e.target.value)}} placeholder=' Subsistema:' maxLength={127} />    
          </div> 
          <div id='printThis'>
          <Data data = {data}
      //filterN={filterN}
        //  avarageCheck={avarageCheck}
          //medianCheck={medianCheck}
          ></Data>
          </div>
          <div className='button-container'>
            <button onClick={(e)=>h2p(Object.values(chartValues.axisY[0]),texto,nome,subsistema)} className="export-button2">
              PDF
            </button>
          </div>
          <div className="textbox-container">
            <textarea className='textbox-container' onChange={(e) => {setTexto(e.target.value)}} placeholder=' Descrição para o Relatório' rows="4" cols="50" maxLength={1023} />
             
          </div>
        </div>
      )
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
          defaultValue={{ value: "TIMER", label: "TIMER" }}
        />
        <Dropdown
          data={data}
          label="Eixo Y"
          name="axis-Y"
          selectedAxis={(value) => chartValues.setAxisY(value)}
          defaultValue={chartValues.axisY.map((axis) => {
            return { value: axis.column, label: axis.column};
            
          })}
        />
      </form>

      
      
      {renderChart()}
    </div>
  );
}

export default TabGeral;



    //const fileName = selectFile.map((file) => {
      //console.log(file.label)
      //return { file: app.use(express.static(`../../../files/${file.label}`)) };
      //return { file: require(`../../../../public/files/${file.label}`) };
      //  return { file: require(`../../../files/${file.label}`) }; 
    //});
    //if (fileName.length !== 0) {
      //tsv(app.use(express.static(fileName[0].file)))
         //} else {
     // history.push("/");
   // }
  // <ConfigRow
    //    filterN={(number) => setFilterN(number)}
    //    avarage={(value) => setAvarageCheck(value)}
    //    median={(value) => setMedianCheck(value)}
    //  />