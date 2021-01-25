import React, { createContext, useState } from "react";

export const tableContext = createContext();

const TableProvider = ({ children }) => {
  const [range, setRange] = useState({});
  const [force, setForce] = useState(false);
  const [LRtext, setLRtext] = useState({});
  const saveRange = (Yaxis, Extent, file) => {
    const aux = range;
    aux[file] = aux[file] ? aux[file] : {};
    aux[file][Yaxis] = Extent;

    setRange(aux);
  };
  const saveLR = (Yaxis, text) => {
    const aux = LRtext;
    aux[Yaxis] = text;
    setLRtext(aux);
  };
  const reRender = () => {
    setForce(!force);
  };
  return (
    <tableContext.Provider
      value={{ range, saveRange, force, reRender, LRtext, saveLR }}
    >
      {children}
    </tableContext.Provider>
  );
};

export default TableProvider;
