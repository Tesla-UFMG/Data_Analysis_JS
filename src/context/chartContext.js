import React, { createContext, useState, useMemo } from 'react';

export const ChartContext = createContext();

const { Provider } = ChartContext;

export const ChartProvider = (props) => {
    const [axisYSelect, setAxisYSelect] = useState([]);
    const [colors, setColors] = useState();

    const chartValues = useMemo(() => ({
        axisYSelect, setAxisYSelect,
        colors, setColors,
    }), [axisYSelect, colors]);

    return(
        <Provider value={chartValues}>
            {props.children}
        </Provider>
    );
}