import React, { useContext } from 'react';

import './tabConfig.css'

import { ChartContext } from "../../../context/chartContext";
import { event } from 'd3';

function TabConfig() {
    const chartValues = useContext(ChartContext);

    function handleChangeColor(event) {
        const auxValues = { ...chartValues.colors };
        auxValues[event.target.name] = event.target.value;
        chartValues.setColors(auxValues);
    }

    return (
        <div id="tab-config">
            <h1 className="tab-title">Tipos de gráfico:</h1>
            <div className="tipo-graficos">
                <div>
                    <input type="radio"
                        className="input-type"
                        name="input-type"
                        id="radio-type-line"
                        value="line-chart"
                    />
                    <label className="label-type" htmlFor="radio-type-line">
                        Grafico de Linha
                    </label>
                </div>
                <div>
                    <input type="radio"
                        className="input-type"
                        name="input-type"
                        id="radio-type-bar"
                        value="bar-chart"
                    />
                    <label className="label-type" htmlFor="radio-type-bar">
                        Grafico de Barra
                    </label>
                </div>
            </div>

            <h1 className="tab-title">Cor das linhas:</h1>
            <div className="color-graficos">
                {chartValues.axisYSelect.map(axis => {
                    return (
                        <div>
                            <label className="label-color" htmlFor={"input-" + axis.column}>
                                {axis.column}:
                            </label>
                            <input type="text"
                                className="input-color"
                                name={axis.column}
                                id={"input-" + axis.column}
                                placeholder="Código da sua cor aqui"
                                onChange={e => handleChangeColor(e)}
                            />
                        </div>
                    );
                })}
            </div>

            <h1 className="tab-title">Tamanho do gráfico:</h1>
            <div className="tamanho-graficos">
                <div>
                    <input type="radio"
                        className="input-size"
                        name="input-size"
                        id="radio-type-line"
                        value="200px"
                    />
                    <label className="label-type" htmlFor="radio-type-line">
                        200px
                    </label>
                </div>
                <div>
                    <input type="radio"
                        className="input-size"
                        name="input-size"
                        id="radio-type-bar"
                        value="400px"
                    />
                    <label className="label-type" htmlFor="radio-type-bar">
                        400px
                    </label>
                </div>
            </div>
        </div>
    );
}

export default TabConfig;