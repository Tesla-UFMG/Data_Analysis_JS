import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import PaginaInicial from './pages/paginaInicial/paginaInicial';
import PaginaGraficos from './pages/paginaGraficos/paginaGrafico';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={PaginaInicial} />
            <Route path="/graficos" exact component={PaginaGraficos} />
        </BrowserRouter>
    );
}

export default Routes;