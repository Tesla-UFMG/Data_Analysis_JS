import React, { createContext, useState } from 'react';

export const FileContext = createContext();

const { Provider } = FileContext;

export const FileProvider = (props) => {
    const [selectFile, setSelectFile] = useState([]);

    return(
        <Provider value={[selectFile, setSelectFile]}>
            {props.children}
        </Provider>
    );
}