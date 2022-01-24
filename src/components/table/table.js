import React, {useContext, useEffect, useState} from 'react'
import { ChartContext } from '../../context/chartContext';
import { tableContext } from '../../context/tableContext'
import TableValues from "./tableValues"
import "./table.css"

function Table() {
    
    const {range,force,LRtext} = useContext(tableContext)
    const [extent, setExtent]= useState(range)
    const [regression, setRegression] = useState(LRtext)
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
    useEffect(()=>{
        const filtered = Object.keys(LRtext)
        .filter(key => Y.includes(key))
        .reduce((obj, key) => {
            obj[key] = LRtext[key];
            return obj;
        }, {});
        setRegression(filtered)
    },[force,LRtext])


    return (
        <div id = {"table"}>
            <table className = "table">
                    <thead>
                    <tr>
                        <th>name</th>
                        <th>min</th>
                        <th>max</th>
                        <th>linear Regression</th>
                    </tr>
                    </thead>
                    <tbody>
                       <TableValues Y = {chartValues.axisY} range = {extent} regression = {regression}></TableValues>
                    </tbody>
            </table>
            
        </div>
    )
}

export default Table
