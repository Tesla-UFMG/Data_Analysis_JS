import React, { useState } from 'react';

import './paginaGrafico.css';

import { ChartProvider } from '../../context/chartContext';

import TabGeral from './TabGeral/tabGeral';
import TabConfig from './TabConfig/tabConfig';
import TabOutros from './TabOutros/tabOutros';

function PaginaGrafico() {
    const [geral, setGeral] = useState(true);
    const [config, setConfig] = useState(false);
    const [outros, setOutros] = useState(false);

    const show_tab = () => {
        if (geral === true) {
            return <TabGeral />
        } else if (outros === true) {
            return <TabOutros />
        } else {
            return <TabConfig />
        }
    }

    return (
        <div id="page-grafico" className="container-fluid px-0">
            <div className="gradient">
                <div className="buttons-container">
                    <button 
                        type="button" 
                        className="btn geral" 
                        id={geral ? 'click' : 'noClick'}
                        onClick={() => {
                            setGeral(true); 
                            setOutros(false);
                            setConfig(false);
                        }} 
                    >
                        Análise Geral
                    </button>
                    <button 
                        type="button" 
                        className="btn outros" 
                        id={outros ? 'click' : 'noClick'}
                        onClick={() => {
                            setGeral(false);
                            setOutros(true);
                            setConfig(false);
                        }} 
                    >
                        Outros gráficos
                    </button>
                    <button 
                        type="button" 
                        className="btn config" 
                        id={config ? 'click' : 'noClick'}
                        onClick={() => {
                            setGeral(false); 
                            setOutros(false);
                            setConfig(true);
                        }} 
                    >
                        Configurações
                    </button>
                </div>

                <div className="page-grafico-content">
                    <ChartProvider>
                        {show_tab()}
                    </ChartProvider>
                </div>
            </div>
        </div>
    );
}

export default PaginaGrafico;