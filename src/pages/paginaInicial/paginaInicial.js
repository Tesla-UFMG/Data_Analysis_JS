import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import Select from 'react-select';

import './paginaInicial.css';

function PaginaInicial() {
    const history = useHistory();

    const [file, setFile] = useState('');
    const [fileArray, setFileArray] = useState([]);
    const [selectFile, setSelectFile] = useState([]);

    const onFileChange = async (event) => {
        setFile(event.target.files[0]); 
    }

    function uploadFiles() {
        const formData = new FormData(); 

        if (file === '') {
            alert('Por favor selecione um arquivo primeiro');
            return
        }
    
        formData.append( 
            "file", 
            file, 
            file.name 
        ); 
       
        console.log(file); 
       
        api.post("/upload", formData).then( res => {
            console.log(res.data);
        }).catch(() => {
            alert("Erro no Upload!");
        });
        
    }

    function listFiles() {
        api.get('/files').then(res => {
            const files = res.data;

            const updateFiles = files.map(file => {
                return { ...file, value: file, label: file }
            })

            setFileArray(updateFiles);
        });
    }

    function handleFilesChange(values) {
        const selectedFiles = values.map(value => {
            return { label: value.label }
        })

        setSelectFile(selectedFiles);
    };

    function postSelectedFiles() {
        if (selectFile.length !== 0) {
            history.push('/graficos');
        } else {
            alert("Por favor selecione um arquivo primeiro")
        }
    }

    return (
        <div id="inicio" className="container-fluid px-0">
            <div className="gradient">
                <h1>Análise de dados</h1>
                <h3>Fórmula Tesla UFMG</h3>

                <div className="buttons-container">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <button className="btn button" type="button" id="inputGroupFileAddon03" onClick={uploadFiles}>Upload de arquivos</button>
                        </div>
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="inputGroupFile03" aria-describedby="inputGroupFileAddon03" onChange={onFileChange}></input>
                            <label className="custom-file-label" htmlFor="inputGroupFile03">Choose file</label>
                        </div>
                    </div>
                </div>

                <div className="buttons-container">
                    <button type="button" className="btn button" onClick={postSelectedFiles}>Selectionar Arquivo</button>
                    <Select
                        isMulti
                        maxMenuHeight={150}
                        name="files"
                        // defaultValue={[{ value:'legenda.txt', label:'legenda.txt' }]}
                        onFocus={listFiles}
                        onChange={handleFilesChange}
                        options={fileArray}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                </div>

            </div>
        </div>
    );
}

export default PaginaInicial;