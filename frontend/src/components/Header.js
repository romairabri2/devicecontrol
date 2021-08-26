import React, { Component } from 'react';
import logoReact from '../assets/images/react.svg';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    render() {

        return (
            <header id="header">
                <div className="center">
                    {/* LOGO */}
                    <div id="logo">
                        <img src={logoReact} className="app-logo" alt="Logotipo" />
                        <span id="brand">
                            <strong>IOT</strong>System
                        </span>
                    </div>

                    {/* MENU */}
                    <nav id="menu">
                        <ul>
                            <li>
                                <NavLink to="/home" activeClassName="active">Devices</NavLink>
                            </li>
                            <li>
                                <NavLink to="/config" activeClassName="active">Settings</NavLink>
                            </li>
 
                        </ul>
                    </nav>

                    {/* LIMPIAR FLOTADOS */}
                    <div className="clearfix"></div>
                </div>
            </header>
        );
    }
}

export default Header;