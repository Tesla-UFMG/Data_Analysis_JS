import React, { useState, useEffect, useContext } from 'react';
import { tsv } from "d3";

import { FileContext } from '../../../context/fileContext';
import Chart from '../../../components/chart/chart';
import ConfigRow from './components/configRow/configRow';
import Dropdown from './components/dropdown/dropdown';

import './tabGeral.css';

function TabGeral(props) {
    const [data, setData] = useState([]);
    const [dataframe, setDataframe] = useState({})
    const [axisX, setAxisX] = useState([{ value:'timer', label:'Timer' }]);
    const [axisY, setAxisY] = useState([]);
    const [submit, setSubmit] = useState(false);
    const [selectFile, setSelectFile] = useContext(FileContext);

    useEffect(() => {
        const fileName = selectFile.map((file) => {
            return { file: require(`../../../files/${file.label}`) }
        })

        tsv(fileName[0].file)
            .then((d) => setData(d))
            .catch((err) => console.log(err));
    }, []);

    function plotingGraphs() {
        const aux = [];
        const columns = [];

        if (axisY.length === 0) {
            return alert('Por favor selecione algum dado antes.')
        }

        for (let i = 0; i < axisY.length; i++) {
            columns.push(axisY[i].column);
            const df = data.map(d => {    
                return { column: columns[i], value: parseFloat(d[columns[i]]) }
            })
            aux.push(df)
        }
        setDataframe(aux)
        setSubmit(true)
    }

    function renderChart() {
        return (
            axisY.map((axis, index) => {
                return <Chart data={dataframe[index]} />
            })
        );
        // return <Chart data={dataframe[0]} />
    }

    return (
        <div id="tab-geral">
            <h1 className="tab-title">Opções de Plotagem</h1>

            <form>
                <Dropdown data={data} label="Eixo X" name="axis-X" selectedAxis={value => {setAxisX(value)}} defaultValue={{ value:'timer', label:'Timer' }}/>
                <Dropdown data={data} label="Eixo Y" name="axis-y" selectedAxis={value => {setAxisY(value)}}/>
            </form>

            <ConfigRow />

            <div className="row">
                <button type="button" className="btn plot-button" onClick={plotingGraphs}>Plotar</button>
            </div>

            <div className="chart">
                {submit && renderChart()}
            </div>
            
            <div className="row">
                <button type="button" className="btn opcoes-avancadas-button">Opções Avançadas</button>
            </div>
        </div>    
    );
}

export default TabGeral;