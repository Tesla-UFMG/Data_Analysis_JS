import React, { useContext, useState } from 'react';

import './tabOutros.css';

import { ChartContext } from "../../../context/chartContext";

import Dropdown from "../TabGeral/components/dropdown/dropdown";

function TabOutros() {
    const chartValues = useContext(ChartContext);

    const [submit, setSubmit] = useState(false);

    return (
        <div id="tab-outros">
            <h1 className="tab-title">Outros tipos de graficos:</h1>

            <form>
                <Dropdown
                    data={chartValues.data}
                    label="Eixo X"
                    name="axis-X"
                    selectedAxis={(value) => chartValues.setAxisX(value)}
                    defaultValue={{ value: "timer", label: "Timer" }}
                />
                <Dropdown
                    data={chartValues.data}
                    label="Eixo Y"
                    name="axis-y"
                    selectedAxis={(value) => chartValues.setAxisY(value)}
                    defaultValue={chartValues.axisY.map(axis => {
                        return { value: axis.column, label: axis.column }
                    })} // Se não quiser que venha os eixos ja selecionados no TabGeral, só tirar o defaultValue
                />
            </form>

            <div className="row">
                <button  type="button" className="btn plot-button" onClick={() => setSubmit(true)}>
                    Plotar
                </button>
            </div>

            <div className="chart"></div>
        </div>
    );
}

export default TabOutros;