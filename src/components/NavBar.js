import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="nav-bar">
            <ul className="nav-links">
                <li><NavLink to="/" end activeClassName="active-link">Itens</NavLink></li>
                <li><NavLink to="/contatosClientes" activeClassName="active-link">Contatos de Clientes</NavLink></li>
                <li><NavLink to="/adicionarLocalidades" activeClassName="active-link">Atualizar Localidades</NavLink></li>
            </ul>
        </nav>
    );
};

export default NavBar;
