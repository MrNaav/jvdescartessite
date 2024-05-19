// src/components/NavBar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="nav-bar">
            <ul>
                <li><NavLink to="/" end>Itens</NavLink></li>
                <li><NavLink to="/contatos-clientes">Contatos de Clientes</NavLink></li>
                <li><NavLink to="/atualizar-localidades">Atualizar Localidades</NavLink></li> {/* Novo link */}
            </ul>
        </nav>
    );
};

export default NavBar;
