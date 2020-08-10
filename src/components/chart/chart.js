import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

import './chart.css';

function Chart(props) {
    const [chart, setChart] = useState(null);
    const data = props.data;

    useEffect(() => {
        // const data5 = [
        //     {value: 10},
        //     {value: 50},
        //     {value: 30},
        //     {value: 40},
        //     {value: 20},
        //     {value: 70},
        //     {value: 50}
        // ];
        // console.log(data5)
        console.log(data)

        // const xScale = d3.scaleLinear().domain([0, 6]).range([0, 600]);
        // const yScale = d3.scaleLinear().domain([0, 80]).range([150, 0]);
        const xScale = d3.scaleLinear().domain([0, data.length]).range([0, 1267]);
        const yScale = d3.scaleLinear().domain([-37, 37]).range([152, 0]);

        const lineGenerator = d3.line();

        const container = d3.select('.chartArea');

        lineGenerator
            .x(function(d, i) {
                return xScale(i);
            })
            .y(function(d) {
                return yScale(d.value);
            });

        const pathData = lineGenerator(data);

        const line = container
            .select('path')
            .attr('d', pathData);

        setChart(line);
    }, [data]);

    return (
        <svg d={chart} className="chartArea">
            <path />
        </svg>
    );
}

export default Chart;