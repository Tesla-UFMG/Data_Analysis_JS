import React, { useState } from 'react';

import './paginaGrafico.css';

import TabGeral from './TabGeral/tabGeral';

function PaginaGrafico() {
    const [geral, setGeral] = useState(true);
    const [config, setConfig] = useState(false);

    const show_tab = () => {
        if (geral === true) {
            return <TabGeral />
        } else {
            return <div>Configuracoes</div>
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
                            setConfig(false);
                        }} 
                    >
                        Análise Geral
                    </button>
                    <button 
                        type="button" 
                        className="btn config" 
                        id={config ? 'click' : 'noClick'}
                        onClick={() => {
                            setGeral(false); 
                            setConfig(true);
                        }} 
                    >
                        Configurações
                    </button>
                </div>

                <div className="page-grafico-content">
                    {show_tab()}
                </div>
            </div>
        </div>
    );
}

export default PaginaGrafico;