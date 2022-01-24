import { useState } from 'react';
 
const useHandleData = (data) => {
    const [dataToHandle, setDataToHandle] = useState(['Intensidade_Frenagem', 'timer', 'Speed_LR', 'Speed_RR', 'Pedal', 'accelX', 'accelY', 'accelZ', 'Volante'])

    function handleDataX(xAxis) {
        if (dataToHandle.includes(xAxis)) {
            data.map(d => {
                if (xAxis === 'timer' || xAxis === 'accelX' || xAxis === 'accelY' || xAxis === 'accelZ') {
                    d[xAxis] = d[xAxis] / 1000;
                }
        
                if (xAxis === 'Intensidade_Frenagem' || xAxis === 'Speed_LR' || xAxis === 'Speed_RR' || xAxis === 'Pedal') {
                    d[xAxis] = d[xAxis] / 10; 
                }
        
                if (xAxis === 'Volante') {
                    d[xAxis] = (d[xAxis] - 1030) / 10;
                }
            })

            const index = dataToHandle.indexOf(xAxis)
            const array_aux = dataToHandle
            array_aux.splice(index, 1);
            setDataToHandle(array_aux)
            console.log(dataToHandle)
        }
    };

    function handleDataY(yAxis) {
        if (dataToHandle.includes(yAxis)) {
            const aux = data.map(d => {
                if (yAxis === 'accelX' || yAxis === 'accelY' || yAxis === 'accelZ') {
                    d[yAxis] = d[yAxis] / 1000;
                }

                if (yAxis === 'Intensidade_Frenagem' || yAxis === 'Speed_LR' || yAxis === 'Speed_RR' || yAxis === 'Pedal') {
                    d[yAxis] = d[yAxis] / 10;
                }

                if (yAxis === 'Volante') {
                    d[yAxis] = (d[yAxis] - 1030) / 10;
                }

                return [...aux, yAxis]
            })

            const index = dataToHandle.indexOf(yAxis)
            const array_aux = dataToHandle
            array_aux.splice(index, 1);
            setDataToHandle(array_aux)
            console.log(dataToHandle)
        }
    };

    return [handleDataX, handleDataY];
};

export default useHandleData;