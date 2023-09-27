import React from "react";
import Plot from 'react-plotly.js';

export default function DataPlot({plot_data}) {
    return (
        <Plot 
            data={[
                {
                    x: plot_data.date,
                    y: plot_data.temp,
                    type: 'scatter',
                    mode: 'lines'
                }
            ]}
        />
    );
}
