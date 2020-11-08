import React from 'react'

function TableValues({Y, range}) {

    const renderTable = ()=> {
        return Y.map(y=>
        range[y.column]?(
         <tr key = {y.column}>
                 <td>{y.column}</td>
                 <td>{range[y.column][0]?range[y.column][0].toFixed(3):null}</td>
                 <td>{range[y.column][1]?range[y.column][1].toFixed(3):null}</td>
         </tr>):null)}
    return (
        renderTable()
    )
}

export default TableValues
