import React, { useContext, useEffect, useState } from "react";
import { ChartContext } from "../../context/chartContext";
import { tableContext } from "../../context/tableContext";
import { FileContext } from "../../context/fileContext";
import TableValues from "./tableValues";
import "./table.css";

function Table() {
  const { range, force, LRtext } = useContext(tableContext);
  const [extent, setExtent] = useState(range);
  const [regression, setRegression] = useState(LRtext);
  const chartValues = useContext(ChartContext);
  const Y = chartValues.axisY.map((y) => y.column);
  const [selectFile] = useContext(FileContext);
  useEffect(() => {
    const filtered = Object.keys(range)
      .filter((key) => Y.includes(key))
      .reduce((obj, key) => {
        obj[key] = range[key];
        return obj;
      }, {});
    setExtent(filtered);
  }, [force]);
  useEffect(() => {
    const filtered = Object.keys(LRtext)
      .filter((key) => Y.includes(key))
      .reduce((obj, key) => {
        obj[key] = LRtext[key];
        return obj;
      }, {});
    setRegression(filtered);
  }, [force, LRtext]);

  return (
    <div id={"table"}>
      <table className="table">
        <thead>
          <tr>
            <th>name</th>
            <th>min</th>
            <th>max</th>
            <th>linear Regression</th>
          </tr>
        </thead>
        <tbody>
          <TableValues
            Y={chartValues.axisY}
            range={extent}
            regression={regression}
          ></TableValues>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
/**import React, { useContext, useEffect, useState } from "react";
import { ChartContext } from "../../context/chartContext";
import { tableContext } from "../../context/tableContext";
import { FileContext } from "../../context/fileContext";
import TableValues from "./tableValues";
import "./table.css";

function Table() {
  const { range, force, LRtext } = useContext(tableContext);
  const [extent, setExtent] = useState(range);
  const [regression, setRegression] = useState(LRtext);
  const chartValues = useContext(ChartContext);
  const [selectFile] = useContext(FileContext);
  const [Y, setY] = useState({});

  useEffect(() => {
    const aux = {};
    selectFile.map((file) => {
      return (aux[file] = chartValues.axisY[file.label].map((y) => y.column));
    });
    setY(aux);
  }, [selectFile]);
  useEffect(() => {
    const filtered = {};
    selectFile.map((file) => {
      return (filtered[file.label] = Object.keys(range)
        .filter((key) => Y[file.label].includes(key))
        .reduce((obj, key) => {
          obj[key] = range[key];
          return obj;
        }, {}));
    });
    setExtent(filtered);
  }, [force, selectFile]);
  useEffect(() => {
    const filtered = {};
    selectFile.map((file) => {
      return (filtered[file.label] = Object.keys(LRtext)
        .filter((key) => Y[file.label].includes(key))
        .reduce((obj, key) => {
          obj[key] = LRtext[key];
          console.log(obj)
          return obj;
        }, {}));
    });
    setRegression(filtered);
  }, [force, LRtext, selectFile]);

  return (
    <div id={"table"}>
      <table className="table">
        <thead>
          <tr>
            <th>name</th>
            <th>min</th>
            <th>max</th>
            <th>linear Regression</th>
          </tr>
        </thead>
        <tbody>
          {selectFile.map((file) => {
            return (
              <TableValues
              key = {file.label}
                Y={chartValues.axisY[file.label]}
                range={extent[file.label]}
                regression={regression[file.label]}
              ></TableValues>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
 */