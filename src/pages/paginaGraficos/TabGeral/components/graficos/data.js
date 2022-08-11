import React, {useContext,useState} from 'react'
import { ChartContext } from "../../../../../context/chartContext";
import ChartUpdate from "./chartUpdate"
import MiniWrapper from "../../../../../components/chartWrapper/miniChartWrapper"
import Xlabelwrapper from "../../../../../components/chartWrapper/xlabelwrapper"
import TableProvider from "../../../../../context/tableContext"
import Table from "../../../../../components/table/table"
function Data({data,filterN,avarageCheck,medianCheck}) {
    const [s, setS] = useState(0);
    const [newXdomain, setNewXdomain] = useState(0);
    const chartValues = useContext(ChartContext);
    
    const renderChart = ()=>{
      if(chartValues){
        return(<div>
          <TableProvider>
              <MiniWrapper
                data={data}
                xAxis={chartValues.axisX.value}
                handleS={(sRecived) => setS(sRecived)}
                handleNewX={(xRecived) => setNewXdomain(xRecived)}
              />
            <ChartUpdate
              data={data}
              filterN={filterN}
              avarageCheck={avarageCheck}
              medianCheck={medianCheck}
              s={s}
              newXdomain={newXdomain}
              ></ChartUpdate>
              <Xlabelwrapper newXdomain={newXdomain}></Xlabelwrapper>
              <Table></Table>
          </TableProvider>
        </div>)
      }
      
    }
    
    return (
        renderChart()
    )
}

export default Data
/*
*/