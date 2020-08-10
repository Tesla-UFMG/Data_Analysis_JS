import React, { useState } from 'react';

import Select from 'react-select';

import './dropdown.css';

function Dropdown(props) {
    const [columns, setColumns] = useState([]);
    const data = props.data;

    function handleSelectChange(value) {
        const selectedValues = value;

        if (selectedValues !== null) {
            const values = selectedValues.map(selectedValue => {
                return { column: selectedValue.value }
            })
    
            props.selectedAxis(values)
        }
    }

    function listOptions() {
        const options = data.columns.map(column => {
            return { value: column, label: column }
        })

        setColumns(options);
    }

    return (
        <div className="input-container">
            <label htmlFor="axis-X">{props.label}</label>
            <Select
                isMulti
                maxMenuHeight={200}
                name={props.name}
                id={props.name}
                defaultValue={props.defaultValue}
                onFocus={listOptions}
                onChange={handleSelectChange}
                options={columns}
                className="basic-multi-select"
                classNamePrefix="select"
            />
        </div>
    );
}

export default Dropdown;