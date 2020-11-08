import React, {useContext, useState} from 'react'
import ChartWrapper from "../../../../../components/chartWrapper/chartWrapper"
import { ChartContext } from '../../../../../context/chartContext';
function ChartUpdate({data,
    filterN,
    medianCheck,
    avarageCheck,
    s,
    newXdomain}) {
    const {axisY} = useContext(ChartContext)
    const [vertical, setVertical] = useState(0);
    const handleVertical = (verticalRecive) => {
        setVertical(verticalRecive);
    };
      
      function renderChart() {
        return axisY.map((axis) => {
          return (
            <ChartWrapper
              key={axis.column}
              data={data}
              filterN={filterN}
              avarageCheck={avarageCheck}
              medianCheck={medianCheck}
              s={s}
              newXdomain={newXdomain}
              handleVertical={handleVertical}
              vertical={vertical}
              yAxis = {axis.column}
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
