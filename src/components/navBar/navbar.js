import React from 'react';

import './navbar.css'

import logo from '../../assets/logo-fundo-preto.png';

class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="/">
                    <img src={logo} className="img-fluid logo" alt="Logo Tesla UFMG"></img>
                </a>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            {/* <a className="nav-link" href="/">Gerar Relatórios<span className="sr-only">(current)</span></a> */}
                        </li>
                        <li className="nav-item">
                            {/* <a className="nav-link" href="/">Manual de instruções</a> */}
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default NavBar;