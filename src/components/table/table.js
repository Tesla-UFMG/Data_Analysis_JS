import React, {useEffect, useState} from 'react'
import * as d3 from "d3"
function Table({ data,
    yAxis,
    xAxis,
    filterN,
    medianCheck,
    avarageCheck,
    s,
    newXdomain}) {
        const [max,setMax] = useState(0)
       useEffect(()=>{
            //console.log(d3.max(data.map(d=> d[yAxis])))

       },[data])

    return (
        <div id = {"table"}>{max}
        </div>
    )
}

export default Table
