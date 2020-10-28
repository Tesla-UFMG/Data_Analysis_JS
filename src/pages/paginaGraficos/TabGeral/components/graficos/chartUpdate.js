import React, {useState} from 'react'
import ChartWrapper from "../../../../../components/chartWrapper/chartWrapper"
function ChartUpdate({data,
    yAxis,
    xAxis,
    filterN,
    medianCheck,
    avarageCheck,
    s,
    newXdomain}) {
    const [vertical, setVertical] = useState(0);
    const handleVertical = (verticalRecive) => {
        setVertical(verticalRecive);
      };
      
      function renderChart() {
        return yAxis.map((axis) => {
          return (
            <ChartWrapper
              key={axis.column}
              data={data}
              xAxis={xAxis}
              yAxis={axis.column}
              filterN={filterN}
              avarageCheck={avarageCheck}
              medianCheck={medianCheck}
              s={s}
              newXdomain={newXdomain}
              handleVertical={handleVertical}
              vertical={vertical}
            />
          );
        });
      }
    return (
        <div>
            {renderChart()}
        </div>
    )
}

export default ChartUpdate
