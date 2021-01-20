import React, { useContext, useState } from "react";
import ChartWrapper from "../../../../../components/chartWrapper/chartWrapper";
import { ChartContext } from "../../../../../context/chartContext";
import { FileContext } from "../../../../../context/fileContext";

function ChartUpdate({
  data,
  filterN,
  medianCheck,
  avarageCheck,
  s,
  newXdomain,
}) {
  const { axisY } = useContext(ChartContext);
  const [vertical, setVertical] = useState(0);
  const handleVertical = (verticalRecive) => {
    setVertical(verticalRecive);
  };
  const [selectFile] = useContext(FileContext);
  function renderChart() {
    return selectFile.map((file) => {
      if (axisY[file.label]) {
        return axisY[file.label].map((axis) => {
          return (
            <ChartWrapper
              key={axis.column}
              data={data[file.label]}
              filterN={filterN}
              avarageCheck={avarageCheck}
              medianCheck={medianCheck}
              s={s}
              newXdomain={newXdomain}
              handleVertical={handleVertical}
              vertical={vertical}
              yAxis={axis.column}
              file = {file.label}
            />
          );
        });
      }
    });
  }
  return <div>{renderChart()}</div>;
}

export default ChartUpdate;
