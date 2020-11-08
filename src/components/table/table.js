import React, {useContext, useEffect, useState} from 'react'
import { ChartContext } from '../../context/chartContext';
import { tableContext } from '../../context/tableContext'
import TableValues from "./tableValues"


function Table() {
    
    const {range,force} = useContext(tableContext)
    const [extent, setExtent]= useState(range)
    const chartValues = useContext(ChartContext);
    const Y = chartValues.axisY.map(y=>y.column)
    
    useEffect(()=>{
        const filtered = Object.keys(range)
        .filter(key => Y.includes(key))
        .reduce((obj, key) => {
            obj[key] = range[key];
            return obj;
        }, {});
        setExtent(filtered)
    },[force])


    return (
        <div id = {"table"}>            
            <table>
                    <thead>
                    <tr>
                        <th>name</th>
                        <th>min</th>
                        <th>max</th>
                    </tr>
                    </thead>
                    <tbody>
                       <TableValues Y = {chartValues.axisY} range = {extent}></TableValues>
                    </tbody>
            </table>
            
        </div>
    )
}

export default Table
