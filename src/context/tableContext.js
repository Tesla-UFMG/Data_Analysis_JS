import React ,{createContext, useState} from "react"

export const tableContext = createContext();

const TableProvider = ({children}) =>{
    const [range, setRange] = useState({});
    const [force,setForce] = useState(false)
    const saveRange = (Yaxis,Extent)=>{
        const aux = range;
        aux[Yaxis] = Extent
        setRange(aux);
    }
    const reRender = ()=>{
        setForce(!force)
    }
    return(
        <tableContext.Provider value = {{range, saveRange,force,reRender}}>
            {children}
        </tableContext.Provider>
    )
}

export default TableProvider;