import React, { useState } from "react";

import "./configRow.css";

function ConfigRow({ filterN, median, avarage }) {
  // const [refLine, setRefLine] = useState(true);

  // const handleRefLine = () => {
  //   const definirGrafico = document.getElementById("switch-definir-grafico");
  //   const definirValor = document.getElementById("switch-definir-valor");

  //   if (definirGrafico.checked) {
  //     console.log("Definir no Grafico");
  //   } else if (definirValor.checked) {
  //     console.log("Definir valor manualmente");
  //   }
  // };

  // const handleDividirVoltas = () => {
  //   const divisaoVoltas = document.getElementById("switch-div-voltas");

  //   if (divisaoVoltas.checked) {
  //     console.log("Divisão de Voltas");
  //   }
  // };

  // const handleDestacarVoltas = () => {
  //   const destacarVoltas = document.getElementById("switch-destacar-voltas");

  //   if (destacarVoltas.checked) {
  //     console.log("Destacar Voltas");
  //   }
  // };

  // const handleSobrepor = () => {
  //   const sobrepor = document.getElementById("switch-sobrepor-voltas");

  //   if (sobrepor.checked) {
  //     console.log("Sobrepor Voltas");
  //   }
  // };

  const handleInputChange = () => {
    const value = document.getElementById("subsequencia").value;
    return filterN(value);
  };

  const handleAvarageChange = () => {
    const value = document.getElementById("check-media-movel").checked;
    return avarage(value);
  };
  
  const handleMedianChange = () => {
    const value = document.getElementById("check-mediana").checked;
    return median(value);
  };

  return (
    <div className="config-row">
      <div className="some-config">
        <h1 className="config-title">Filtros</h1>

        <div className="check-wrapper">
          <div className="check-container">
            <input
              className="checkbox"
              type="checkbox"
              value="media"
              id="check-media-movel"
              onChange={handleAvarageChange}
            />
            <label className="checkbox" htmlFor="check-media-movel">
              Média móvel
            </label>
          </div>
          <div className="check-container">
            <input
              className="checkbox"
              type="checkbox"
              value="mediana"
              id="check-mediana"
              onChange={handleMedianChange}
            />
            <label className="checkbox" htmlFor="check-mediana">
              Filtro mediana
            </label>
          </div>
        </div>

        <div className="input-wrapper">
          <label htmlFor="subsequencia">Subsequência do filtro</label>
          <input
            type="number"
            id="subsequencia"
            name="subsequencia"
            min="1"
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* <div className="some-config">
        <h1 className="config-title">Linhas de Referência</h1>

        <div className="check-container">
          <input
            className="checkbox"
            type="checkbox"
            value="linha-horizontal"
            id="check-linha-horizontal"
            onClick={() => setRefLine(!refLine)}
          />
          <label className="checkbox" htmlFor="check-linha-horizontal">
            Linha horizontal
          </label>
        </div>

        <div className="switches-ref-line">
          <div className="custom-control custom-switch">
            <input
              disabled={refLine}
              type="radio"
              className="custom-control-input"
              name="refLine"
              id="switch-definir-grafico"
              value="definir-grafico"
              onClick={handleRefLine}
            />
            <label className="custom-control-label" htmlFor="switch-definir-grafico">
              Definir no gráfico
            </label>
          </div>

          <div className="custom-control custom-switch">
            <input
              disabled={refLine}
              type="radio"
              className="custom-control-input"
              name="refLine"
              id="switch-definir-valor"
              value="definir-valor"
              onClick={handleRefLine}
            />
            <label className="custom-control-label" htmlFor="switch-definir-valor">
              Definir valor
            </label>
          </div>
        </div>
      </div>

      <div className="some-config">
        <h1 className="config-title">Divisão de Voltas</h1>

        <div className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id="switch-div-voltas"
            value="dividir"
            onClick={handleDividirVoltas}
          />
          <label className="custom-control-label" htmlFor="switch-div-voltas">
            Divisão de voltas
          </label>
        </div>

        <div className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id="switch-destacar-voltas"
            value="destacar"
            onClick={handleDestacarVoltas}
          />
          <label className="custom-control-label" htmlFor="switch-destacar-voltas">
            Destacar voltas
          </label>
        </div>
      </div> */}

      {/* <div className="some-config">
        <h1 className="config-title">Sobreposição de Voltas</h1>

        <div className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id="switch-sobrepor-voltas"
            value="sobrepor"
            onClick={handleSobrepor}
          />
          <label className="custom-control-label" htmlFor="switch-sobrepor-voltas">
            Sobrepor Voltas
          </label>
        </div>
      </div> */}
    </div>
  );
}

export default ConfigRow;
