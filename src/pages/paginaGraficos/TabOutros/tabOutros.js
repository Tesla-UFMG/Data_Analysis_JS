import React, { useContext, useState } from 'react';

import './tabOutros.css';

import { ChartContext } from "../../../context/chartContext";

import Dropdown from "../TabGeral/components/dropdown/dropdown";

function TabOutros() {
    const chartValues = useContext(ChartContext);

    const [submit, setSubmit] = useState(false);
    const n_voltas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let contador = 0;

    function renderCheckboxVoltas() {
        return (
            n_voltas.map((laps, i) => {
                if (i*3 < n_voltas.length) {
                    return (
                        <div className="checkbox-wrapper">
                            {n_voltas.map((lap, index) => {
                                if (index < 3 && contador < n_voltas.length) {
                                    contador++;
                                    return (<div>
                                        <input type="checkbox"
                                            className="laps-checkbox"
                                            name="laps"
                                            id={"lap-" + contador}
                                            value={"lap-" + contador}
                                        />
                                        <label className="label-lap" htmlFor={"lap-" + contador}>Volta {contador}</label>
                                    </div>);
                                }
                            })}
                        </div>
                    );
                }
            })
        );
    }

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

            <div className="row options-row">
                <div className="some-options">
                    <h1 className="option-title">Tipos de Gráficos</h1>

                    <div className="inputs-container">
                        {renderCheckboxVoltas()}
                    </div>
                </div>

                <div className="some-options">
                    <h1 className="option-title">Canais matemáticos</h1>

                    <div className="inputs-container">
                        <p>Dropdown</p>
                    </div>
                </div>
            </div>

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