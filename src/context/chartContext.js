import React, { createContext, useState, useMemo } from 'react';

export const ChartContext = createContext();

const { Provider } = ChartContext;

export const ChartProvider = (props) => {
    const [axisY, setAxisY] = useState([]);
    const [axisX, setAxisX] = useState({ value: "timer", label: "Timer" });
    const [colors, setColors] = useState("#003cff");
    const [size,setSize] = useState(200)
    const [data, setData] = useState([]);

    const chartValues = useMemo(() => ({
        data, setData,
        axisY, setAxisY,
        axisX, setAxisX,
        colors, setColors,
        size, setSize
    }), [axisY, axisX, colors, data,size]);

    return(
        <Provider value={chartValues}>
            {props.children}
        </Provider>
    );
}